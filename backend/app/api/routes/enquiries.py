"""
Vetri Driving Academy — Enquiry Submission & Lead Capture API
=============================================================
Role & Purpose:
- POST /api/enquiries: Receives student enrolment queries from the frontend form.
- Validates input, persists the lead in the `enquiries` table, and immediately schedules
  asynchronous background email notifications to the driving school owner (and optionally the student).
- Non-blocking: Uses FastAPI BackgroundTasks so the user receives an instant success response
  without waiting for SMTP handshakes.
"""

import logging

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.core.config import settings
from app.models.enquiry import Enquiry
from app.schemas.enquiry import EnquiryCreate, EnquiryOut
from app.services.email import (
    send_enquiry_confirmation_to_student_sync,
    send_enquiry_notification_to_owner,
)

logger = logging.getLogger("uvicorn.error")

router = APIRouter(prefix="/enquiries", tags=["enquiries"])


@router.post("", response_model=EnquiryOut, status_code=201)
async def create_enquiry(
    data: EnquiryCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
) -> EnquiryOut:
    """Submit a new enrolment enquiry and dispatch email to academy owner."""
    try:
        enquiry = Enquiry(
            name=data.name,
            phone=data.phone,
            email=data.email,
            course_interest=data.course_interest,
            message=data.message,
            source_page=data.source_page,
            status="new",
        )
        db.add(enquiry)
        await db.commit()
        await db.refresh(enquiry)

        enquiry_dict = {
            "id": enquiry.id,
            "name": enquiry.name,
            "phone": enquiry.phone,
            "email": enquiry.email,
            "course_interest": enquiry.course_interest,
            "message": enquiry.message,
            "source_page": enquiry.source_page,
        }

        # Send owner notification inline (awaited) so we know if it succeeded.
        # Previously this was a BackgroundTask which silently swallowed errors,
        # causing the "success" response even when email delivery failed.
        notification_sent = False
        try:
            notification_sent = await send_enquiry_notification_to_owner(enquiry_dict)
        except Exception as email_err:
            logger.error(f"Owner notification failed: {email_err}", exc_info=True)

        # Student confirmation is non-critical — safe to run in background
        background_tasks.add_task(send_enquiry_confirmation_to_student_sync, enquiry_dict)

        return EnquiryOut(
            id=enquiry.id,
            name=enquiry.name,
            phone=enquiry.phone,
            course_interest=enquiry.course_interest,
            status=enquiry.status,
            owner_email=settings.admin_email,
            notification_sent=notification_sent,
        )
    except HTTPException:
        raise
    except Exception as exc:
        await db.rollback()
        logger.error(f"Failed to save enquiry: {exc}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Failed to save enquiry: {str(exc)}",
        ) from exc

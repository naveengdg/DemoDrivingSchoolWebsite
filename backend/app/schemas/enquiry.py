"""
Vetri Driving Academy — Enquiry Validation & Response Schemas
=============================================================
Role & Purpose:
- EnquiryCreate: Validates incoming student enquiry payloads from the React frontend,
  enforcing rules like 10-digit Indian mobile number regex (`^[6-9]\\d{9}$`), minimum name length,
  and character limits before hitting the database or trigger emails.
- EnquiryOut: Returns a sanitized confirmation receipt back to the frontend after saving.
"""

from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class EnquiryCreate(BaseModel):
    """Validated enquiry form data from the frontend."""

    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10, max_length=15, pattern=r"^[6-9]\d{9}$")
    email: Optional[str] = Field(None, max_length=120)
    course_interest: str = Field(..., min_length=2, max_length=120)
    message: Optional[str] = Field(None, max_length=1000)
    source_page: str = Field(..., max_length=50)


class EnquiryOut(BaseModel):
    """Confirmation response after enquiry submission."""

    id: int
    name: str
    phone: str
    course_interest: str
    status: str
    owner_email: Optional[str] = None
    notification_sent: bool = True

    model_config = {"from_attributes": True}

"""
Vetri Driving Academy — Course API Endpoints
============================================
Role & Purpose:
- Exposes REST endpoints to query active driving courses.
- GET /api/courses: Fetches all active courses sorted by fee, with optional licence category filtering.
- GET /api/courses/{id}: Retrieves comprehensive details for a specific single course.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.models.course import Course
from app.schemas.course import CourseListOut, CourseOut

router = APIRouter(prefix="/courses", tags=["courses"])


@router.get("", response_model=CourseListOut)
async def list_courses(
    category: str | None = None,
    db: AsyncSession = Depends(get_db),
) -> CourseListOut:
    """Return all active courses, optionally filtered by licence category."""
    query = select(Course).where(Course.is_active.is_(True))

    if category:
        query = query.where(Course.licence_category == category)

    query = query.order_by(Course.fee_amount.asc())
    result = await db.execute(query)
    courses = result.scalars().all()

    return CourseListOut(
        courses=[CourseOut.model_validate(c) for c in courses],
        total=len(courses),
    )


@router.get("/{course_id}", response_model=CourseOut)
async def get_course(
    course_id: int,
    db: AsyncSession = Depends(get_db),
) -> CourseOut:
    """Return a single course by ID."""
    result = await db.execute(select(Course).where(Course.id == course_id))
    course = result.scalar_one_or_none()

    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    return CourseOut.model_validate(course)

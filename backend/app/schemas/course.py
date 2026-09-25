"""
Vetri Driving Academy — Course Pydantic Schemas
===============================================
Role & Purpose:
- Defines strongly-typed response serialization models for driving academy courses.
- CourseOut: Serializes SQLAlchemy Course models into clean JSON matching frontend TypeScript types.
- CourseListOut: Returns an array of available active courses along with a total count.
"""

from pydantic import BaseModel


class CourseOut(BaseModel):
    """Course data returned to the frontend."""

    id: int
    name: str
    licence_category: str
    duration_days: int
    sessions_included: int
    session_duration_minutes: int
    vehicle_type: str
    rto_test_prep: bool
    learner_licence_assistance: bool
    fee_amount: float
    instalment_available: bool
    description: str

    model_config = {"from_attributes": True}


class CourseListOut(BaseModel):
    """Paginated list of courses."""

    courses: list[CourseOut]
    total: int

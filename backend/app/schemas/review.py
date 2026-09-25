"""
Vetri Driving Academy — Review Pydantic Schemas
===============================================
Role & Purpose:
- Defines serialization schemas for student testimonials and Google reviews.
- ReviewOut: Serializes review entries (student name, hometown location, star rating, feedback).
- ReviewListOut: Bundles review items along with computed aggregate statistics (average rating, total count).
"""

from datetime import datetime

from pydantic import BaseModel


class ReviewOut(BaseModel):
    """Review data returned to the frontend."""

    id: int
    student_name: str
    location: str
    rating: int
    course_taken: str
    testimonial: str
    result: str
    created_at: datetime

    model_config = {"from_attributes": True}


class ReviewListOut(BaseModel):
    """List of reviews with summary statistics."""

    reviews: list[ReviewOut]
    total: int
    average_rating: float

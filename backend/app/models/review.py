"""
Vetri Driving Academy — Student Review Database Model
=====================================================
Role & Purpose:
- Defines the SQLAlchemy ORM schema for the `reviews` database table.
- Stores student testimonials, star ratings (1 to 5), hometown location in Madurai,
  course completed, and RTO test outcomes (e.g., "Passed RTO test on first attempt").
- Serves social proof to the Reviews page and Homepage testimonial carousel.
"""

from datetime import datetime

from sqlalchemy import DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.core.database import Base


class Review(Base):
    """A testimonial from a student who completed training."""

    __tablename__ = "reviews"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    student_name: Mapped[str] = mapped_column(String(100), nullable=False)
    location: Mapped[str] = mapped_column(String(80), nullable=False)
    rating: Mapped[int] = mapped_column(Integer, nullable=False)
    course_taken: Mapped[str] = mapped_column(String(120), nullable=False)
    testimonial: Mapped[str] = mapped_column(Text, nullable=False)
    result: Mapped[str] = mapped_column(String(200), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

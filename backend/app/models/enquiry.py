"""
Vetri Driving Academy — Student Enquiry Database Model
======================================================
Role & Purpose:
- Defines the SQLAlchemy ORM schema for the `enquiries` database table.
- Permanently records every student lead submitted through the website with applicant name,
  contact number, email address, selected driving course, optional notes, and timestamp.
- Allows the business owner to maintain a persistent CRM log of all student enquiries.
"""

from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.core.database import Base


class Enquiry(Base):
    """An enrolment enquiry submitted via the website."""

    __tablename__ = "enquiries"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    phone: Mapped[str] = mapped_column(String(15), nullable=False)
    email: Mapped[Optional[str]] = mapped_column(String(120), nullable=True)
    course_interest: Mapped[str] = mapped_column(String(120), nullable=False)
    message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    source_page: Mapped[str] = mapped_column(String(50), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    status: Mapped[str] = mapped_column(String(20), default="new")

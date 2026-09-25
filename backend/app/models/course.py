"""
Vetri Driving Academy — Course Database Model
=============================================
Role & Purpose:
- Defines the SQLAlchemy ORM schema for the `courses` database table.
- Stores course metadata including curriculum duration, sessions, vehicle transmission type,
  RTO test preparation, licence assistance, fee pricing, and active status.
- Consumed by API routes to serve courses on the Courses and Home pages.
"""

from sqlalchemy import Boolean, Integer, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Course(Base):
    """A training course offered by the academy."""

    __tablename__ = "courses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    licence_category: Mapped[str] = mapped_column(String(30), nullable=False)
    duration_days: Mapped[int] = mapped_column(Integer, nullable=False)
    sessions_included: Mapped[int] = mapped_column(Integer, nullable=False)
    session_duration_minutes: Mapped[int] = mapped_column(Integer, default=60)
    vehicle_type: Mapped[str] = mapped_column(String(50), nullable=False)
    rto_test_prep: Mapped[bool] = mapped_column(Boolean, default=True)
    learner_licence_assistance: Mapped[bool] = mapped_column(Boolean, default=True)
    fee_amount: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    instalment_available: Mapped[bool] = mapped_column(Boolean, default=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

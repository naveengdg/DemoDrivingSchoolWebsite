"""Re-export all models so Alembic and create_tables() see them."""

from app.models.course import Course
from app.models.enquiry import Enquiry
from app.models.review import Review

__all__ = ["Course", "Enquiry", "Review"]

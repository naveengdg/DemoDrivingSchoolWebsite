"""
Vetri Driving Academy — Review & Testimonial API Endpoints
==========================================================
Role & Purpose:
- GET /api/reviews: Returns student reviews ordered chronologically with computed average rating.
- Powers the Reviews page testimonial list and the Homepage animated review carousel.
"""

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.models.review import Review
from app.schemas.review import ReviewListOut, ReviewOut

router = APIRouter(prefix="/reviews", tags=["reviews"])


@router.get("", response_model=ReviewListOut)
async def list_reviews(
    limit: int = 20,
    db: AsyncSession = Depends(get_db),
) -> ReviewListOut:
    """Return reviews ordered by most recent, with average rating."""
    result = await db.execute(
        select(Review).order_by(Review.created_at.desc()).limit(limit)
    )
    reviews = result.scalars().all()

    avg_result = await db.execute(select(func.avg(Review.rating)))
    avg_rating = avg_result.scalar() or 0.0

    return ReviewListOut(
        reviews=[ReviewOut.model_validate(r) for r in reviews],
        total=len(reviews),
        average_rating=round(float(avg_rating), 1),
    )

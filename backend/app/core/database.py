"""
Vetri Driving Academy — Async Database Engine & Session Management
===================================================================
Role & Purpose:
- Configures SQLAlchemy 2.0 asynchronous engine (asyncpg for Postgres, aiosqlite for SQLite).
- Provides an async session maker factory for non-blocking database queries.
- Declares the SQLAlchemy DeclarativeBase for table models (Course, Review, Enquiry).
- Provides create_tables() utility executed during FastAPI application startup.
"""

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.core.config import settings

engine_kwargs: dict = {
    "echo": settings.app_env == "development",
}

# SQLite doesn't support pool_size / max_overflow
if "sqlite" not in settings.database_url:
    engine_kwargs["pool_size"] = 5
    engine_kwargs["max_overflow"] = 10

engine = create_async_engine(
    settings.database_url,
    **engine_kwargs,
)

async_session = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    """Base class for all SQLAlchemy models."""

    pass


async def create_tables() -> None:
    """Create all tables defined by Base subclasses."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

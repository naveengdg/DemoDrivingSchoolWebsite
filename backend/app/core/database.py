"""
Vetri Driving Academy — Async Database Engine & Session Management
===================================================================
Role & Purpose:
- Configures SQLAlchemy 2.0 asynchronous engine (asyncpg for Postgres, aiosqlite for SQLite).
- Provides an async session maker factory for non-blocking database queries.
- Declares the SQLAlchemy DeclarativeBase for table models (Course, Review, Enquiry).
- Provides create_tables() utility executed during FastAPI application startup.
"""

from sqlalchemy.engine.url import make_url
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.core.config import settings

engine_kwargs: dict = {
    "echo": settings.app_env == "development",
}

# Normalize database URL for async drivers
raw_url = settings.database_url
if raw_url.startswith("postgres://"):
    raw_url = raw_url.replace("postgres://", "postgresql+asyncpg://", 1)
elif raw_url.startswith("postgresql://") and "+asyncpg" not in raw_url:
    raw_url = raw_url.replace("postgresql://", "postgresql+asyncpg://", 1)

url_obj = make_url(raw_url)
if "asyncpg" in url_obj.drivername:
    query = dict(url_obj.query)
    # asyncpg does not accept 'sslmode' keyword arg; it uses 'ssl'
    sslmode = query.pop("sslmode", None)
    if sslmode:
        query["ssl"] = sslmode
    url_obj = url_obj.set(query=query)
    db_url = url_obj.render_as_string(hide_password=False)
else:
    db_url = raw_url

# SQLite does not support connection pooling settings
if "sqlite" not in db_url:
    engine_kwargs["pool_size"] = 5
    engine_kwargs["max_overflow"] = 10

engine = create_async_engine(
    db_url,
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

"""
Vetri Driving Academy — FastAPI Route Dependencies
===================================================
Role & Purpose:
- Defines reusable dependency injection providers used across all API route handlers.
- get_db(): Safely yields an isolated AsyncSession per request and guarantees proper
  connection cleanup and closing, preventing database connection leaks.
"""

from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import async_session


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Yield an async database session, auto-closed on request end."""
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()

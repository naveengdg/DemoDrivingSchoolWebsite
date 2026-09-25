"""
Vetri Driving Academy — Backend Application Entry Point (FastAPI)
==================================================================
Role & Purpose:
- Serves as the primary HTTP server entry point for the Vetri Driving Academy API.
- Configures CORS middleware so the React/Vite frontend can securely make requests.
- Manages application lifecycle (startup table creation via SQLAlchemy).
- Mounts all core API routers:
    • /api/courses   -> Course catalog, pricing, and curriculum
    • /api/reviews   -> Verified student testimonials and ratings
    • /api/enquiries -> Student lead capture and automated email alerts
- Exposes /api/health for system uptime and load balancer health checks.
"""

from contextlib import asynccontextmanager
from collections.abc import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import create_tables

# Import models so Base.metadata knows about all tables
import app.models  # noqa: F401

from app.api.routes.courses import router as courses_router
from app.api.routes.reviews import router as reviews_router
from app.api.routes.enquiries import router as enquiries_router


@asynccontextmanager
async def lifespan(application: FastAPI) -> AsyncGenerator[None, None]:
    """Startup: create DB tables. Shutdown: nothing special."""
    await create_tables()
    yield


app = FastAPI(
    title="Vetri Driving Academy API",
    description="Backend API for the Vetri Driving Academy demo website.",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount route modules
app.include_router(courses_router, prefix="/api")
app.include_router(reviews_router, prefix="/api")
app.include_router(enquiries_router, prefix="/api")


@app.get("/api/health")
async def health_check() -> dict[str, str]:
    """Simple health check endpoint."""
    return {"status": "healthy", "service": "vetri-driving-academy-api"}

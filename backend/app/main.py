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

# CORS — allow frontend dev server and any Vercel deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount route modules
app.include_router(courses_router, prefix="/api")
app.include_router(reviews_router, prefix="/api")
app.include_router(enquiries_router, prefix="/api")


@app.get("/")
async def root() -> dict[str, str]:
    """Root endpoint welcoming visitors and linking to interactive docs."""
    return {
        "message": "Welcome to Vetri Driving Academy API",
        "status": "online",
        "documentation": "/docs",
        "health": "/api/health",
    }


@app.get("/api/health")
async def health_check() -> dict:
    """Simple health check endpoint."""
    return {
        "status": "healthy",
        "service": "vetri-driving-academy-api",
        "has_smtp_host": bool(settings.smtp_host),
        "has_smtp_user": bool(settings.smtp_user),
        "has_smtp_password": bool(settings.smtp_password),
        "admin_email": settings.admin_email,
    }


@app.get("/api/diag/email-status")
async def email_diagnostic() -> dict:
    """Check whether SMTP environment variables are loaded in production."""
    return {
        "has_smtp_host": bool(settings.smtp_host),
        "smtp_host": settings.smtp_host,
        "smtp_port": settings.smtp_port,
        "has_smtp_user": bool(settings.smtp_user),
        "smtp_user": settings.smtp_user if settings.smtp_user else None,
        "has_smtp_password": bool(settings.smtp_password),
        "smtp_password_len": len(settings.smtp_password) if settings.smtp_password else 0,
        "admin_email": settings.admin_email,
        "smtp_from_email": settings.smtp_from_email,
        "smtp_use_tls": settings.smtp_use_tls,
    }


@app.post("/api/diag/test-email")
async def test_email_dispatch() -> dict:
    """Attempt an immediate test email dispatch and return detailed error if any."""
    import traceback
    from app.services.email import send_enquiry_notification_to_owner
    test_data = {
        "id": 999,
        "name": "Diagnostic Lead",
        "phone": "9876543210",
        "email": settings.admin_email,
        "course_interest": "LMV Car — Complete Beginner",
        "message": "Testing production email delivery on Render",
        "source_page": "Diagnostic Check",
    }
    try:
        success = await send_enquiry_notification_to_owner(test_data)
        return {"success": success}
    except Exception as e:
        return {"success": False, "error": str(e), "traceback": traceback.format_exc()}

"""
Vetri Driving Academy — Central Application Configuration
=========================================================
Role & Purpose:
- Loads and validates environment variables using Pydantic Settings.
- Manages database connection strings (SQLite for local dev, PostgreSQL for production).
- Configures authorized CORS origins for frontend domain access.
- Stores Gmail SMTP configuration and owner email for instant lead notification dispatch.
- Robustly locates .env relative to backend root to prevent path-resolution errors.
"""

from pathlib import Path

from pydantic_settings import BaseSettings

# Resolve .env path relative to the backend directory (where .env actually lives),
# not the current working directory. This ensures SMTP credentials are always loaded
# regardless of which directory the server process is started from.
_BACKEND_DIR = Path(__file__).resolve().parent.parent.parent
_ENV_FILE = _BACKEND_DIR / ".env"


class Settings(BaseSettings):
    """Central configuration — reads from .env or environment."""

    database_url: str = (
        "sqlite+aiosqlite:///./vetri_driving.db"
    )
    cors_origins: str = "http://localhost:5173,http://localhost:3000"
    app_env: str = "development"

    # Admin / Business Owner Email Settings
    admin_email: str = "naveenkanakaraj2023@gmail.com"
    resend_api_key: str = ""
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    smtp_from_email: str = "naveenkanakaraj2023@gmail.com"
    smtp_use_tls: bool = True

    @property
    def cors_origin_list(self) -> list[str]:
        """Parse comma-separated CORS origins into a list."""
        return [origin.strip() for origin in self.cors_origins.split(",")]

    model_config = {"env_file": str(_ENV_FILE), "env_file_encoding": "utf-8", "extra": "ignore"}


settings = Settings()

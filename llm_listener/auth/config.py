"""Authentication configuration settings."""

import os
from typing import Optional
from pydantic_settings import BaseSettings


class AuthSettings(BaseSettings):
    """Auth0 and authentication settings loaded from environment variables."""

    # Auth0 Configuration
    auth0_domain: str = "resilienthub.us.auth0.com"
    auth0_client_id: str = ""
    auth0_client_secret: str = ""
    auth0_audience: str = ""  # API identifier in Auth0

    # Auth0 OIDC endpoints (derived from domain)
    @property
    def auth0_issuer(self) -> str:
        return f"https://{self.auth0_domain}/"

    @property
    def auth0_jwks_url(self) -> str:
        return f"https://{self.auth0_domain}/.well-known/jwks.json"

    @property
    def auth0_authorize_url(self) -> str:
        return f"https://{self.auth0_domain}/authorize"

    @property
    def auth0_token_url(self) -> str:
        return f"https://{self.auth0_domain}/oauth/token"

    @property
    def auth0_userinfo_url(self) -> str:
        return f"https://{self.auth0_domain}/userinfo"

    @property
    def auth0_logout_url(self) -> str:
        return f"https://{self.auth0_domain}/v2/logout"

    # Application settings
    app_url: str = "http://localhost:5173"  # Frontend URL for redirects
    api_url: str = "http://localhost:8000"  # Backend URL

    # Session settings
    session_secret_key: str = ""  # For signing session cookies
    session_max_age: int = 86400  # 24 hours

    # Role claim namespace (Auth0 custom claims)
    role_claim_namespace: str = "https://resilienthub.org/claims"

    # Default role for new users
    default_role: str = "viewer"

    # Whether auth is required (disabled by default, enable when ready)
    auth_required: bool = False

    class Config:
        env_prefix = ""
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"  # Ignore extra env vars not defined here

    @classmethod
    def from_env(cls) -> "AuthSettings":
        """Create settings from environment variables."""
        return cls(
            auth0_domain=os.getenv("AUTH0_DOMAIN", "resilienthub.us.auth0.com"),
            auth0_client_id=os.getenv("AUTH0_CLIENT_ID", ""),
            auth0_client_secret=os.getenv("AUTH0_CLIENT_SECRET", ""),
            auth0_audience=os.getenv("AUTH0_AUDIENCE", ""),
            app_url=os.getenv("APP_URL", "http://localhost:5173"),
            api_url=os.getenv("API_URL", "http://localhost:8000"),
            session_secret_key=os.getenv("SESSION_SECRET_KEY", ""),
            session_max_age=int(os.getenv("SESSION_MAX_AGE", "86400")),
            role_claim_namespace=os.getenv("ROLE_CLAIM_NAMESPACE", "https://resilienthub.org/claims"),
            default_role=os.getenv("DEFAULT_ROLE", "viewer"),
            auth_required=os.getenv("AUTH_REQUIRED", "false").lower() in ("true", "1", "yes"),
        )

    def is_configured(self) -> bool:
        """Check if Auth0 is properly configured."""
        return bool(
            self.auth0_client_id and
            self.auth0_client_secret and
            self.session_secret_key
        )

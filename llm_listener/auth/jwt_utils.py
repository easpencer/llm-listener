"""JWT token validation utilities."""

import jwt
from jwt import PyJWKClient
from typing import Optional, Dict, Any, List
from datetime import datetime

from .config import AuthSettings


class JWTValidator:
    """Validates JWT tokens from Auth0."""

    def __init__(self, settings: AuthSettings):
        self.settings = settings
        self._jwk_client: Optional[PyJWKClient] = None

    @property
    def jwk_client(self) -> PyJWKClient:
        """Lazy-load the JWK client."""
        if self._jwk_client is None:
            self._jwk_client = PyJWKClient(self.settings.auth0_jwks_url)
        return self._jwk_client

    def validate_token(self, token: str) -> Dict[str, Any]:
        """Validate a JWT token and return its claims.

        Args:
            token: The JWT token to validate

        Returns:
            Decoded token claims

        Raises:
            JWTValidationError: If token is invalid
        """
        try:
            # Get the signing key from JWKS
            signing_key = self.jwk_client.get_signing_key_from_jwt(token)

            # Decode and validate the token
            claims = jwt.decode(
                token,
                signing_key.key,
                algorithms=["RS256"],
                issuer=self.settings.auth0_issuer,
                audience=self.settings.auth0_audience or self.settings.auth0_client_id,
                options={
                    "verify_exp": True,
                    "verify_iat": True,
                    "verify_aud": True,
                    "verify_iss": True,
                },
            )

            return claims

        except jwt.ExpiredSignatureError:
            raise JWTValidationError("Token has expired")
        except jwt.InvalidAudienceError:
            raise JWTValidationError("Invalid audience")
        except jwt.InvalidIssuerError:
            raise JWTValidationError("Invalid issuer")
        except jwt.InvalidTokenError as e:
            raise JWTValidationError(f"Invalid token: {str(e)}")
        except Exception as e:
            raise JWTValidationError(f"Token validation failed: {str(e)}")

    def extract_user_info(self, claims: Dict[str, Any]) -> "UserInfo":
        """Extract user information from token claims.

        Args:
            claims: Decoded JWT claims

        Returns:
            UserInfo object with user details
        """
        # Extract role from custom claim namespace
        namespace = self.settings.role_claim_namespace
        role_claim = f"{namespace}/role"

        # Get role from claims, default to configured default
        role = claims.get(role_claim, self.settings.default_role)

        # Handle case where role might be a list
        if isinstance(role, list):
            roles = role
        else:
            roles = [role] if role else [self.settings.default_role]

        return UserInfo(
            sub=claims.get("sub", ""),
            email=claims.get("email"),
            name=claims.get("name"),
            picture=claims.get("picture"),
            roles=roles,
            email_verified=claims.get("email_verified", False),
            raw_claims=claims,
        )


class UserInfo:
    """User information extracted from JWT token."""

    def __init__(
        self,
        sub: str,
        email: Optional[str] = None,
        name: Optional[str] = None,
        picture: Optional[str] = None,
        roles: Optional[List[str]] = None,
        email_verified: bool = False,
        raw_claims: Optional[Dict[str, Any]] = None,
    ):
        self.sub = sub  # Unique user identifier
        self.email = email
        self.name = name
        self.picture = picture
        self.roles = roles or ["viewer"]
        self.email_verified = email_verified
        self.raw_claims = raw_claims or {}

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary for JSON serialization."""
        return {
            "sub": self.sub,
            "email": self.email,
            "name": self.name,
            "picture": self.picture,
            "roles": self.roles,
            "email_verified": self.email_verified,
        }


class JWTValidationError(Exception):
    """Exception raised for JWT validation errors."""
    pass

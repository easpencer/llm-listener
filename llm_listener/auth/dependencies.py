"""FastAPI dependencies for authentication."""

from typing import Optional, Callable, Set
from functools import wraps

from fastapi import Depends, HTTPException, status, Request, Cookie
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from .config import AuthSettings
from .jwt_utils import JWTValidator, UserInfo, JWTValidationError
from .rbac import has_permission, get_user_permissions

# HTTP Bearer security scheme (optional - allows unauthenticated requests)
security = HTTPBearer(auto_error=False)

# Global settings and validator (initialized on first use)
_auth_settings: Optional[AuthSettings] = None
_jwt_validator: Optional[JWTValidator] = None


def get_auth_settings() -> AuthSettings:
    """Get auth settings singleton."""
    global _auth_settings
    if _auth_settings is None:
        _auth_settings = AuthSettings.from_env()
    return _auth_settings


def get_jwt_validator() -> JWTValidator:
    """Get JWT validator singleton."""
    global _jwt_validator
    if _jwt_validator is None:
        _jwt_validator = JWTValidator(get_auth_settings())
    return _jwt_validator


async def get_current_user(
    request: Request,
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
    session_token: Optional[str] = Cookie(None, alias="session_token"),
) -> Optional[UserInfo]:
    """Extract and validate the current user from the request.

    This dependency checks for authentication in the following order:
    1. Bearer token in Authorization header
    2. Session cookie (session_token)

    Args:
        request: The FastAPI request
        credentials: Bearer token credentials (if provided)
        session_token: Session cookie token (if provided)

    Returns:
        UserInfo if authenticated, None otherwise
    """
    settings = get_auth_settings()

    # If auth is not required and no token provided, return None
    token = None

    # Check Authorization header first
    if credentials and credentials.credentials:
        token = credentials.credentials

    # Fall back to session cookie
    elif session_token:
        token = session_token

    # No token found
    if not token:
        return None

    # Validate the token
    try:
        validator = get_jwt_validator()
        claims = validator.validate_token(token)
        user = validator.extract_user_info(claims)

        # Attach user to request state for convenience
        request.state.user = user
        return user

    except JWTValidationError:
        # Invalid token - treat as unauthenticated
        return None


async def require_auth(
    user: Optional[UserInfo] = Depends(get_current_user),
) -> UserInfo:
    """Dependency that requires authentication.

    Raises 401 if user is not authenticated.
    """
    settings = get_auth_settings()

    if not settings.auth_required:
        # Auth disabled - return a mock user for development
        return UserInfo(
            sub="dev-user",
            email="dev@localhost",
            name="Development User",
            roles=["admin"],  # Give admin access in dev mode
        )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user


def require_permission(permission: str) -> Callable:
    """Create a dependency that requires a specific permission.

    Args:
        permission: The permission required (e.g., "prism:query")

    Returns:
        A FastAPI dependency function
    """
    async def permission_dependency(
        user: UserInfo = Depends(require_auth),
    ) -> UserInfo:
        """Check if user has the required permission."""
        user_permissions = get_user_permissions(user.roles)

        if not has_permission(user_permissions, permission):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Permission '{permission}' required",
            )

        return user

    return permission_dependency


def require_any_permission(*permissions: str) -> Callable:
    """Create a dependency that requires any of the specified permissions.

    Args:
        permissions: List of permissions (user needs at least one)

    Returns:
        A FastAPI dependency function
    """
    async def permission_dependency(
        user: UserInfo = Depends(require_auth),
    ) -> UserInfo:
        """Check if user has any of the required permissions."""
        user_permissions = get_user_permissions(user.roles)

        for perm in permissions:
            if has_permission(user_permissions, perm):
                return user

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"One of these permissions required: {', '.join(permissions)}",
        )

    return permission_dependency


class AuthenticatedUser:
    """Context manager / dependency for getting authenticated user with permissions."""

    def __init__(self, user: UserInfo):
        self.user = user
        self.permissions: Set[str] = get_user_permissions(user.roles)

    def has_permission(self, permission: str) -> bool:
        """Check if user has a specific permission."""
        return has_permission(self.permissions, permission)

    def require_permission(self, permission: str) -> None:
        """Raise 403 if user doesn't have permission."""
        if not self.has_permission(permission):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Permission '{permission}' required",
            )


async def get_authenticated_user(
    user: UserInfo = Depends(require_auth),
) -> AuthenticatedUser:
    """Get authenticated user with permission checking utilities."""
    return AuthenticatedUser(user)

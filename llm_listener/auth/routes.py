"""Authentication routes for FastAPI."""

from typing import Optional
from datetime import datetime, timedelta

from fastapi import APIRouter, HTTPException, Request, Response, Depends, Query
from fastapi.responses import RedirectResponse, JSONResponse
from pydantic import BaseModel

from .config import AuthSettings
from .oidc import OIDCClient, OIDCError
from .jwt_utils import JWTValidator, UserInfo
from .dependencies import get_current_user, get_auth_settings, require_auth
from .rbac import get_user_permissions

router = APIRouter(prefix="/api/auth", tags=["auth"])


class UserResponse(BaseModel):
    """Response model for user info."""
    sub: str
    email: Optional[str] = None
    name: Optional[str] = None
    picture: Optional[str] = None
    roles: list[str]
    permissions: list[str]
    email_verified: bool = False


class AuthStatusResponse(BaseModel):
    """Response model for auth status."""
    authenticated: bool
    auth_required: bool
    auth_configured: bool
    user: Optional[UserResponse] = None


# In-memory state storage (use Redis in production)
_auth_states: dict[str, datetime] = {}


def _cleanup_expired_states():
    """Remove expired auth states."""
    now = datetime.utcnow()
    expired = [k for k, v in _auth_states.items() if now - v > timedelta(minutes=10)]
    for k in expired:
        del _auth_states[k]


@router.get("/login")
async def login(
    request: Request,
    return_to: Optional[str] = Query(None, description="URL to redirect to after login"),
):
    """Initiate the login flow by redirecting to Auth0.

    This endpoint redirects the user to Auth0 for authentication.
    After successful auth, user is redirected back to /api/auth/callback.
    """
    settings = get_auth_settings()

    if not settings.is_configured():
        raise HTTPException(
            status_code=500,
            detail="Authentication not configured. Set AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, and SESSION_SECRET_KEY.",
        )

    # Build callback URL
    callback_url = f"{settings.api_url}/api/auth/callback"

    # Generate authorization URL
    client = OIDCClient(settings)
    auth_url, state = client.get_authorization_url(callback_url)

    # Store state with timestamp for validation
    _cleanup_expired_states()
    _auth_states[state] = datetime.utcnow()

    # Store return_to in session state (could also use a more sophisticated approach)
    if return_to:
        _auth_states[f"{state}_return_to"] = return_to

    return RedirectResponse(url=auth_url, status_code=302)


@router.get("/callback")
async def callback(
    request: Request,
    response: Response,
    code: str = Query(..., description="Authorization code from Auth0"),
    state: str = Query(..., description="State parameter for CSRF protection"),
    error: Optional[str] = Query(None),
    error_description: Optional[str] = Query(None),
):
    """Handle the OAuth callback from Auth0.

    This endpoint exchanges the authorization code for tokens,
    validates them, and sets the session cookie.
    """
    settings = get_auth_settings()

    # Check for errors from Auth0
    if error:
        raise HTTPException(
            status_code=400,
            detail=f"Auth0 error: {error} - {error_description or 'No description'}",
        )

    # Validate state
    _cleanup_expired_states()
    if state not in _auth_states:
        raise HTTPException(status_code=400, detail="Invalid or expired state parameter")

    # Remove used state
    del _auth_states[state]

    # Get return_to URL if stored
    return_to_key = f"{state}_return_to"
    return_to = _auth_states.pop(return_to_key, None)

    # Build callback URL (must match what was sent to Auth0)
    callback_url = f"{settings.api_url}/api/auth/callback"

    try:
        # Exchange code for tokens
        client = OIDCClient(settings)
        tokens = await client.exchange_code_for_tokens(code, callback_url)

        # Get the ID token (contains user info)
        id_token = tokens.get("id_token")
        access_token = tokens.get("access_token")

        if not id_token:
            raise HTTPException(status_code=400, detail="No ID token received from Auth0")

        # Validate the ID token
        validator = JWTValidator(settings)
        claims = validator.validate_token(id_token)
        user = validator.extract_user_info(claims)

        # Create response - redirect to frontend
        redirect_url = return_to or settings.app_url
        redirect_response = RedirectResponse(url=redirect_url, status_code=302)

        # Set session cookie with the ID token
        redirect_response.set_cookie(
            key="session_token",
            value=id_token,
            max_age=settings.session_max_age,
            httponly=True,
            secure=True,  # Requires HTTPS in production
            samesite="lax",
        )

        # Also set access token if we have one (for API calls)
        if access_token:
            redirect_response.set_cookie(
                key="access_token",
                value=access_token,
                max_age=settings.session_max_age,
                httponly=True,
                secure=True,
                samesite="lax",
            )

        return redirect_response

    except OIDCError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/logout")
async def logout(
    request: Request,
    return_to: Optional[str] = Query(None, description="URL to redirect to after logout"),
):
    """Log out the user and redirect to Auth0 logout.

    This clears the session cookie and redirects to Auth0 to end the session.
    """
    settings = get_auth_settings()

    # Build return URL
    final_return_to = return_to or settings.app_url

    # Get Auth0 logout URL
    client = OIDCClient(settings)
    logout_url = client.get_logout_url(final_return_to)

    # Create response with logout redirect
    response = RedirectResponse(url=logout_url, status_code=302)

    # Clear session cookies
    response.delete_cookie(key="session_token")
    response.delete_cookie(key="access_token")

    return response


@router.get("/me", response_model=UserResponse)
async def get_me(
    user: UserInfo = Depends(require_auth),
):
    """Get the current user's information.

    Returns user profile and permissions.
    """
    permissions = get_user_permissions(user.roles)

    return UserResponse(
        sub=user.sub,
        email=user.email,
        name=user.name,
        picture=user.picture,
        roles=user.roles,
        permissions=list(permissions),
        email_verified=user.email_verified,
    )


@router.get("/status", response_model=AuthStatusResponse)
async def get_auth_status(
    user: Optional[UserInfo] = Depends(get_current_user),
):
    """Get authentication status.

    Returns whether the user is authenticated and whether auth is required.
    Useful for the frontend to determine if login is needed.
    """
    settings = get_auth_settings()

    user_response = None
    if user:
        permissions = get_user_permissions(user.roles)
        user_response = UserResponse(
            sub=user.sub,
            email=user.email,
            name=user.name,
            picture=user.picture,
            roles=user.roles,
            permissions=list(permissions),
            email_verified=user.email_verified,
        )

    return AuthStatusResponse(
        authenticated=user is not None,
        auth_required=settings.auth_required,
        auth_configured=settings.is_configured(),
        user=user_response,
    )


@router.post("/refresh")
async def refresh_token(request: Request):
    """Refresh the session token.

    Note: This is a placeholder. Full refresh token flow requires
    storing refresh tokens securely (in a database) and implementing
    token rotation.
    """
    # For now, just return current status
    # A full implementation would use refresh tokens
    raise HTTPException(
        status_code=501,
        detail="Token refresh not implemented. Please log in again.",
    )

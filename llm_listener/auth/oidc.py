"""OIDC client for Auth0 authentication."""

import httpx
from typing import Optional, Dict, Any
from urllib.parse import urlencode
import secrets

from .config import AuthSettings


class OIDCClient:
    """Client for Auth0 OIDC authentication flows."""

    def __init__(self, settings: AuthSettings):
        self.settings = settings
        self._jwks_cache: Optional[Dict] = None

    def get_authorization_url(self, redirect_uri: str, state: Optional[str] = None) -> tuple[str, str]:
        """Generate the Auth0 authorization URL.

        Args:
            redirect_uri: URL to redirect to after authentication
            state: Optional state parameter (generated if not provided)

        Returns:
            Tuple of (authorization_url, state)
        """
        if state is None:
            state = secrets.token_urlsafe(32)

        params = {
            "client_id": self.settings.auth0_client_id,
            "response_type": "code",
            "redirect_uri": redirect_uri,
            "scope": "openid profile email",
            "state": state,
        }

        # Add audience if configured (for API access tokens)
        if self.settings.auth0_audience:
            params["audience"] = self.settings.auth0_audience

        url = f"{self.settings.auth0_authorize_url}?{urlencode(params)}"
        return url, state

    async def exchange_code_for_tokens(self, code: str, redirect_uri: str) -> Dict[str, Any]:
        """Exchange authorization code for tokens.

        Args:
            code: The authorization code from the callback
            redirect_uri: The same redirect_uri used in the authorization request

        Returns:
            Token response containing access_token, id_token, etc.
        """
        async with httpx.AsyncClient() as client:
            response = await client.post(
                self.settings.auth0_token_url,
                data={
                    "grant_type": "authorization_code",
                    "client_id": self.settings.auth0_client_id,
                    "client_secret": self.settings.auth0_client_secret,
                    "code": code,
                    "redirect_uri": redirect_uri,
                },
                headers={"Content-Type": "application/x-www-form-urlencoded"},
            )

            if response.status_code != 200:
                raise OIDCError(f"Token exchange failed: {response.text}")

            return response.json()

    async def get_userinfo(self, access_token: str) -> Dict[str, Any]:
        """Fetch user info from Auth0.

        Args:
            access_token: The access token from token exchange

        Returns:
            User info from Auth0
        """
        async with httpx.AsyncClient() as client:
            response = await client.get(
                self.settings.auth0_userinfo_url,
                headers={"Authorization": f"Bearer {access_token}"},
            )

            if response.status_code != 200:
                raise OIDCError(f"User info fetch failed: {response.text}")

            return response.json()

    async def get_jwks(self) -> Dict[str, Any]:
        """Fetch JWKS from Auth0 for token validation.

        Returns:
            JWKS document
        """
        if self._jwks_cache is not None:
            return self._jwks_cache

        async with httpx.AsyncClient() as client:
            response = await client.get(self.settings.auth0_jwks_url)

            if response.status_code != 200:
                raise OIDCError(f"JWKS fetch failed: {response.text}")

            self._jwks_cache = response.json()
            return self._jwks_cache

    def get_logout_url(self, return_to: str) -> str:
        """Generate the Auth0 logout URL.

        Args:
            return_to: URL to redirect to after logout

        Returns:
            Logout URL
        """
        params = {
            "client_id": self.settings.auth0_client_id,
            "returnTo": return_to,
        }
        return f"{self.settings.auth0_logout_url}?{urlencode(params)}"


class OIDCError(Exception):
    """Exception raised for OIDC-related errors."""
    pass

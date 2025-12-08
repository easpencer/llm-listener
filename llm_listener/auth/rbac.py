"""Role-Based Access Control (RBAC) definitions and utilities."""

from typing import Dict, List, Optional, Set

# Role definitions with permissions
# Permissions follow the pattern: "{app}:{action}" or "*" for all
ROLES: Dict[str, Dict] = {
    "admin": {
        "description": "Full system access",
        "permissions": ["*"],
    },
    "researcher": {
        "description": "Research-focused access (Chorus)",
        "permissions": [
            "chorus:read",
            "chorus:query",
            "chorus:evidence",
            "chorus:clarify",
            "prism:read",  # Read-only access to PRISM
        ],
    },
    "clinician": {
        "description": "Clinical practice access",
        "permissions": [
            "prism:read",
            "prism:query",
            "chorus:read",
            "chorus:query",
        ],
    },
    "public_health": {
        "description": "Public health messaging focus (PRISM)",
        "permissions": [
            "prism:read",
            "prism:query",
            "prism:study",
        ],
    },
    "study_participant": {
        "description": "Study participation only",
        "permissions": [
            "prism:study",
        ],
    },
    "viewer": {
        "description": "Read-only access",
        "permissions": [
            "prism:read",
            "chorus:read",
        ],
    },
}

# Route to permission mapping
# Used by middleware to check permissions for specific routes
ROUTE_PERMISSIONS: Dict[str, Optional[str]] = {
    # Public routes (no permission required)
    "/api/config": None,
    "/api/providers": None,
    "/api/auth/login": None,
    "/api/auth/callback": None,
    "/api/auth/logout": None,

    # PRISM routes
    "/api/query:public_health": "prism:query",
    "/api/study": "prism:study",

    # CHORUS routes
    "/api/query:health_research": "chorus:query",
    "/api/evidence": "chorus:evidence",
    "/api/clarify": "chorus:clarify",
    "/api/clarify-step": "chorus:clarify",
}


def get_role_permissions(role: str) -> Set[str]:
    """Get all permissions for a given role."""
    role_def = ROLES.get(role, ROLES.get("viewer", {}))
    return set(role_def.get("permissions", []))


def get_user_permissions(roles: List[str]) -> Set[str]:
    """Get combined permissions for a list of roles."""
    permissions: Set[str] = set()
    for role in roles:
        permissions.update(get_role_permissions(role))
    return permissions


def has_permission(user_permissions: Set[str], required_permission: str) -> bool:
    """Check if user has the required permission.

    Args:
        user_permissions: Set of permissions the user has
        required_permission: The permission to check for

    Returns:
        True if user has the permission (or wildcard), False otherwise
    """
    # Wildcard grants all permissions
    if "*" in user_permissions:
        return True

    # Direct permission match
    if required_permission in user_permissions:
        return True

    # Check for app-level wildcard (e.g., "prism:*" grants "prism:query")
    if ":" in required_permission:
        app, action = required_permission.split(":", 1)
        if f"{app}:*" in user_permissions:
            return True

    return False


def get_required_permission(path: str, mode: Optional[str] = None) -> Optional[str]:
    """Get the required permission for a given route.

    Args:
        path: The API path (e.g., "/api/query")
        mode: Optional mode for routes that vary by mode (e.g., "public_health")

    Returns:
        The required permission string, or None if no permission required
    """
    # Check for mode-specific permission first
    if mode:
        mode_key = f"{path}:{mode}"
        if mode_key in ROUTE_PERMISSIONS:
            return ROUTE_PERMISSIONS[mode_key]

    # Check for exact path match
    if path in ROUTE_PERMISSIONS:
        return ROUTE_PERMISSIONS[path]

    # Check for prefix matches (for paths like /api/study/*)
    for route_path, permission in ROUTE_PERMISSIONS.items():
        if route_path.endswith("*"):
            prefix = route_path[:-1]
            if path.startswith(prefix):
                return permission

    # Default: require authentication but no specific permission
    return None

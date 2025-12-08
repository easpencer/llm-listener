import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Auth context for managing authentication state
const AuthContext = createContext(null);

// Auth status response from backend
const AUTH_STATUS_URL = '/api/auth/status';
const AUTH_ME_URL = '/api/auth/me';
const AUTH_LOGIN_URL = '/api/auth/login';
const AUTH_LOGOUT_URL = '/api/auth/logout';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authRequired, setAuthRequired] = useState(true);
  const [authConfigured, setAuthConfigured] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(AUTH_STATUS_URL, {
        credentials: 'include', // Include cookies
      });

      if (!response.ok) {
        throw new Error('Failed to check auth status');
      }

      const data = await response.json();

      setAuthRequired(data.auth_required);
      setAuthConfigured(data.auth_configured);

      if (data.authenticated && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Auth status check failed:', err);
      setError(err.message);
      // On error, assume auth is required for safety
      setAuthRequired(true);
    } finally {
      setLoading(false);
    }
  };

  // Redirect to login
  const login = useCallback((returnTo = null) => {
    const currentUrl = returnTo || window.location.href;
    const loginUrl = `${AUTH_LOGIN_URL}?return_to=${encodeURIComponent(currentUrl)}`;
    window.location.href = loginUrl;
  }, []);

  // Redirect to logout
  const logout = useCallback((returnTo = null) => {
    const currentUrl = returnTo || window.location.origin;
    const logoutUrl = `${AUTH_LOGOUT_URL}?return_to=${encodeURIComponent(currentUrl)}`;
    window.location.href = logoutUrl;
  }, []);

  // Check if user has a specific permission
  const hasPermission = useCallback((permission) => {
    if (!user) return false;
    if (!user.permissions) return false;

    // Wildcard grants all permissions
    if (user.permissions.includes('*')) return true;

    // Direct match
    if (user.permissions.includes(permission)) return true;

    // App-level wildcard (e.g., "prism:*" grants "prism:query")
    if (permission.includes(':')) {
      const [app] = permission.split(':');
      if (user.permissions.includes(`${app}:*`)) return true;
    }

    return false;
  }, [user]);

  // Check if user has any of the specified permissions
  const hasAnyPermission = useCallback((...permissions) => {
    return permissions.some(perm => hasPermission(perm));
  }, [hasPermission]);

  // Check if user has all specified permissions
  const hasAllPermissions = useCallback((...permissions) => {
    return permissions.every(perm => hasPermission(perm));
  }, [hasPermission]);

  // Check if user has a specific role
  const hasRole = useCallback((role) => {
    if (!user) return false;
    if (!user.roles) return false;
    return user.roles.includes(role);
  }, [user]);

  // Determine if user needs to login (auth required but not authenticated)
  const needsLogin = authRequired && !user && !loading;

  const value = {
    // State
    user,
    loading,
    error,
    authRequired,
    authConfigured,
    needsLogin,
    isAuthenticated: !!user,

    // Actions
    login,
    logout,
    checkAuthStatus,

    // Permission helpers
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Component that requires authentication
export function RequireAuth({ children, permission = null, fallback = null }) {
  const { isAuthenticated, loading, needsLogin, login, hasPermission } = useAuth();

  if (loading) {
    return fallback || <AuthLoadingState />;
  }

  if (needsLogin) {
    return <LoginPrompt onLogin={login} />;
  }

  if (permission && !hasPermission(permission)) {
    return <PermissionDenied permission={permission} />;
  }

  return children;
}

// Loading state component
function AuthLoadingState() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      gap: '1rem',
    }}>
      <div className="spinner" style={{
        width: '40px',
        height: '40px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #3498db',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }} />
      <p>Checking authentication...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Login prompt component
function LoginPrompt({ onLogin }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      gap: '1.5rem',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '2rem', margin: 0 }}>Authentication Required</h1>
      <p style={{ color: '#666', maxWidth: '400px' }}>
        You need to sign in to access this application.
        Click the button below to continue with your institutional login.
      </p>
      <button
        onClick={() => onLogin()}
        style={{
          padding: '12px 32px',
          fontSize: '1rem',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600',
        }}
      >
        Sign In
      </button>
      <p style={{ fontSize: '0.85rem', color: '#888' }}>
        Powered by CILogon - Research Institution Login
      </p>
    </div>
  );
}

// Permission denied component
function PermissionDenied({ permission }) {
  const { user, logout } = useAuth();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      gap: '1rem',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '1.5rem', color: '#dc2626', margin: 0 }}>
        Access Denied
      </h1>
      <p style={{ color: '#666', maxWidth: '400px' }}>
        You don't have permission to access this feature.
        {permission && <span> Required permission: <code>{permission}</code></span>}
      </p>
      {user && (
        <p style={{ fontSize: '0.85rem', color: '#888' }}>
          Signed in as: {user.email || user.name || user.sub}
          <br />
          Roles: {user.roles?.join(', ') || 'none'}
        </p>
      )}
      <button
        onClick={() => logout()}
        style={{
          padding: '8px 16px',
          fontSize: '0.9rem',
          backgroundColor: '#f3f4f6',
          color: '#374151',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

// User menu component for displaying current user
export function UserMenu() {
  const { user, isAuthenticated, loading, login, logout } = useAuth();

  if (loading) {
    return <span style={{ color: '#888' }}>...</span>;
  }

  if (!isAuthenticated) {
    return (
      <button
        onClick={() => login()}
        style={{
          padding: '6px 12px',
          fontSize: '0.85rem',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Sign In
      </button>
    );
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>
      {user.picture && (
        <img
          src={user.picture}
          alt=""
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
          }}
        />
      )}
      <span style={{ fontSize: '0.85rem' }}>
        {user.name || user.email || 'User'}
      </span>
      <button
        onClick={() => logout()}
        style={{
          padding: '4px 8px',
          fontSize: '0.75rem',
          backgroundColor: 'transparent',
          color: '#666',
          border: '1px solid #ddd',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

export default AuthContext;

import React, { createContext, useContext, useState, useEffect } from 'react';

// Simple password protection context
// This is a basic authentication gate - NOT for production security
// For production, use the full Auth0 integration in AuthContext.jsx

const SimpleAuthContext = createContext(null);

// Hardcoded credentials (for demo/development only)
const VALID_USERNAME = 'Admin';
const VALID_PASSWORD = 'Admin123!';
const SESSION_KEY = 'prism_chorus_simple_auth';

export function SimpleAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (session === 'authenticated') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'authenticated');
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
  };

  return (
    <SimpleAuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </SimpleAuthContext.Provider>
  );
}

export function useSimpleAuth() {
  const context = useContext(SimpleAuthContext);
  if (!context) {
    throw new Error('useSimpleAuth must be used within a SimpleAuthProvider');
  }
  return context;
}

// Login gate component
export function SimpleAuthGate({ children }) {
  const { isAuthenticated, loading } = useSimpleAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return children;
}

function LoadingScreen() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '4px solid rgba(255, 255, 255, 0.2)',
        borderTop: '4px solid rgba(255, 255, 255, 0.9)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

function LoginScreen() {
  const { login } = useSimpleAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Small delay for UX
    setTimeout(() => {
      const result = login(username, password);
      if (!result.success) {
        setError(result.error);
      }
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative gradient orbs */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '40%',
        height: '40%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
      }} />

      {/* Glassmorphic login card */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '50px 40px',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 0 60px rgba(255, 255, 255, 0.05)',
        width: '100%',
        maxWidth: '420px',
        margin: '20px',
        position: 'relative',
        animation: 'float 6s ease-in-out infinite',
      }}>
        {/* Logo/Title area */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-block',
            padding: '12px 28px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '16px',
            marginBottom: '20px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: 0,
              letterSpacing: '1px',
            }}>
              PRISM | Chorus
            </h1>
          </div>
          <p style={{
            fontSize: '15px',
            color: 'rgba(255, 255, 255, 0.9)',
            margin: 0,
            fontWeight: '400',
          }}>
            Please sign in to continue
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '8px',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '15px',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease',
                color: '#ffffff',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1), inset 0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
            />
            <style>{`
              input::placeholder {
                color: rgba(255, 255, 255, 0.6);
              }
            `}</style>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '8px',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '15px',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'all 0.3s ease',
                color: '#ffffff',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.1), inset 0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.1)';
              }}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.2)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: '#ffffff',
              padding: '14px',
              borderRadius: '12px',
              fontSize: '14px',
              marginBottom: '24px',
              textAlign: 'center',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
              fontWeight: '500',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '15px',
              fontWeight: '600',
              background: isSubmitting
                ? 'rgba(255, 255, 255, 0.3)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '12px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseOver={(e) => {
              if (!isSubmitting) {
                e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.3) 100%)';
                e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseOut={(e) => {
              if (!isSubmitting) {
                e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.7)',
          textAlign: 'center',
          marginTop: '28px',
          marginBottom: 0,
          fontWeight: '400',
        }}>
          Protected access for authorized users only
        </p>
      </div>
    </div>
  );
}

// Logout button component for use in the app
export function SimpleLogoutButton({ style = {} }) {
  const { logout } = useSimpleAuth();

  return (
    <button
      onClick={logout}
      style={{
        padding: '6px 12px',
        fontSize: '12px',
        backgroundColor: 'transparent',
        color: '#666',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'pointer',
        ...style,
      }}
    >
      Sign Out
    </button>
  );
}

export default SimpleAuthContext;

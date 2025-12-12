import React, { createContext, useContext, useState, useEffect } from 'react';

// Simple password protection context
// This is a basic authentication gate - NOT for production security
// For production, use the full Auth0 integration in AuthContext.jsx

const SimpleAuthContext = createContext(null);

// Hardcoded credentials (for demo/development only)
const VALID_USERNAME = 'Admin';
const VALID_PASSWORD = 'Admin123!';
const SESSION_KEY = 'prism_chorus_simple_auth';

// Brand configurations for PRISM and Chorus
const BRANDS = {
  prism: {
    name: 'PRISM',
    tagline: 'Public Health Intelligence System',
    description: 'Evidence-based insights for public health decision making',
    colors: {
      primary: '#0f766e',      // Teal
      secondary: '#0d9488',
      accent: '#14b8a6',
      background: '#f0fdfa',
      gradientFrom: '#f0fdfa',
      gradientTo: '#ccfbf1',
      cardBg: 'rgba(255, 255, 255, 0.95)',
      text: '#134e4a',
      textLight: '#5eead4',
    }
  },
  chorus: {
    name: 'Chorus',
    tagline: 'Research Evidence Synthesis',
    description: 'AI-powered systematic review and evidence analysis',
    colors: {
      primary: '#6d28d9',      // Purple
      secondary: '#7c3aed',
      accent: '#8b5cf6',
      background: '#faf5ff',
      gradientFrom: '#faf5ff',
      gradientTo: '#ede9fe',
      cardBg: 'rgba(255, 255, 255, 0.95)',
      text: '#4c1d95',
      textLight: '#c4b5fd',
    }
  }
};

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
    // Trim whitespace and compare (username case-insensitive)
    const trimmedUser = (username || '').trim();
    const trimmedPass = (password || '').trim();

    if (trimmedUser.toLowerCase() === VALID_USERNAME.toLowerCase() && trimmedPass === VALID_PASSWORD) {
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

// Get app mode from build-time environment variable or API
// Set VITE_APP_MODE=prism or VITE_APP_MODE=chorus when building
function getAppModeFromEnv() {
  // Check Vite environment variable (set at build time)
  const envMode = import.meta.env.VITE_APP_MODE;
  if (envMode === 'prism' || envMode === 'chorus') {
    return envMode;
  }
  return null;
}

// Login gate component
export function SimpleAuthGate({ children }) {
  const { isAuthenticated, loading } = useSimpleAuth();
  const [appMode, setAppMode] = useState(() => getAppModeFromEnv());
  const [configLoading, setConfigLoading] = useState(!getAppModeFromEnv());

  // Fetch app config only if not set via environment variable
  useEffect(() => {
    // If mode already set from env, skip API call
    if (appMode) {
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    fetch('/api/config', { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error('Config fetch failed');
        return res.json();
      })
      .then(data => {
        setAppMode(data.app_mode || 'prism');
        setConfigLoading(false);
      })
      .catch(() => {
        // If API fails, default to prism
        setAppMode('prism');
        setConfigLoading(false);
      })
      .finally(() => {
        clearTimeout(timeoutId);
      });

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [appMode]);

  if (loading || configLoading) {
    return <LoadingScreen mode={appMode} />;
  }

  if (!isAuthenticated) {
    return <LoginScreen mode={appMode} />;
  }

  return children;
}

function LoadingScreen({ mode = 'prism' }) {
  const brand = BRANDS[mode] || BRANDS.prism;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: `linear-gradient(180deg, ${brand.colors.gradientFrom} 0%, ${brand.colors.gradientTo} 100%)`,
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: `3px solid ${brand.colors.textLight}`,
        borderTop: `3px solid ${brand.colors.primary}`,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function LoginScreen({ mode = 'prism' }) {
  const { login } = useSimpleAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const brand = BRANDS[mode] || BRANDS.prism;
  const isChorus = mode === 'chorus';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const result = login(username, password);
      if (!result.success) {
        setError(result.error);
      }
      setIsSubmitting(false);
    }, 200);
  };

  // Chorus gets a special login screen with background image
  if (isChorus) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        minHeight: '100dvh',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      }}>
        {/* Background image with overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}>
          <img
            src="/images/login-bg.jpg"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(12, 18, 34, 0.88) 0%, rgba(26, 26, 46, 0.85) 50%, rgba(15, 23, 42, 0.88) 100%)',
          }} />
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '420px' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <img
              src="/images/logo-2.png"
              alt="Chorus"
              style={{
                height: '60px',
                width: 'auto',
                marginBottom: '12px',
              }}
            />
            <p style={{
              fontSize: '15px',
              color: '#94a3b8',
              margin: 0,
              fontWeight: '500',
            }}>
              Where AI Meets Evidence-Based Answers
            </p>
          </div>

          {/* Login Card */}
          <div style={{
            background: 'rgba(30, 41, 59, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '36px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(148, 163, 184, 0.15)',
          }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#f1f5f9',
                margin: '0 0 4px 0',
              }}>
                Sign in
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#94a3b8',
                margin: 0,
              }}>
                Enter your credentials to continue
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#e2e8f0',
                  marginBottom: '6px',
                }}>
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                  autoComplete="username"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: '15px',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '10px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    color: '#f1f5f9',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(6, 182, 212, 0.5)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#e2e8f0',
                  marginBottom: '6px',
                }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: '15px',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: '10px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    color: '#f1f5f9',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(6, 182, 212, 0.5)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(6, 182, 212, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {error && (
                <div style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  color: '#f87171',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  fontSize: '14px',
                  marginBottom: '20px',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '15px',
                  fontWeight: '600',
                  background: isSubmitting ? '#475569' : 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  if (!isSubmitting) {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(6, 182, 212, 0.4)';
                  }
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>

          {/* Footer */}
          <p style={{
            fontSize: '13px',
            color: '#64748b',
            textAlign: 'center',
            marginTop: '24px',
          }}>
            AI-powered evidence synthesis for better decisions
          </p>
        </div>
      </div>
    );
  }

  // Default Prism login screen (unchanged)
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      background: `linear-gradient(180deg, ${brand.colors.gradientFrom} 0%, ${brand.colors.gradientTo} 100%)`,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    }}>
      {/* Logo/Brand Area */}
      <div style={{
        textAlign: 'center',
        marginBottom: '32px',
      }}>
        <h1 style={{
          fontSize: '42px',
          fontWeight: '700',
          color: brand.colors.primary,
          margin: '0 0 8px 0',
          letterSpacing: '-0.5px',
        }}>
          {brand.name}
        </h1>
        <p style={{
          fontSize: '16px',
          color: brand.colors.text,
          margin: 0,
          opacity: 0.8,
          fontWeight: '500',
        }}>
          {brand.tagline}
        </p>
      </div>

      {/* Login Card */}
      <div style={{
        background: brand.colors.cardBg,
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid rgba(0, 0, 0, 0.06)',
      }}>
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 4px 0',
          }}>
            Sign in
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0,
          }}>
            Enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px',
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              autoComplete="username"
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: '15px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                backgroundColor: '#fff',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = brand.colors.primary;
                e.target.style.boxShadow = `0 0 0 3px ${brand.colors.primary}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px',
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              autoComplete="current-password"
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: '15px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                backgroundColor: '#fff',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = brand.colors.primary;
                e.target.style.boxShadow = `0 0 0 3px ${brand.colors.primary}20`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {error && (
            <div style={{
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              padding: '12px 14px',
              borderRadius: '8px',
              fontSize: '14px',
              marginBottom: '20px',
              border: '1px solid #fecaca',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '15px',
              fontWeight: '600',
              backgroundColor: isSubmitting ? '#9ca3af' : brand.colors.primary,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.15s ease',
            }}
            onMouseOver={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = brand.colors.secondary;
              }
            }}
            onMouseOut={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = brand.colors.primary;
              }
            }}
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>

      {/* Footer */}
      <p style={{
        fontSize: '13px',
        color: brand.colors.text,
        opacity: 0.6,
        textAlign: 'center',
        marginTop: '24px',
        maxWidth: '300px',
      }}>
        {brand.description}
      </p>
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
        fontSize: '13px',
        fontWeight: '500',
        backgroundColor: 'transparent',
        color: '#6b7280',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        ...style,
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = '#f9fafb';
        e.target.style.borderColor = '#d1d5db';
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = 'transparent';
        e.target.style.borderColor = '#e5e7eb';
      }}
    >
      Sign out
    </button>
  );
}

export default SimpleAuthContext;

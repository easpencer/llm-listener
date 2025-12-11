import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ResultsDashboard from './ResultsDashboard'
import { AuthProvider } from './AuthContext'
import { SimpleAuthProvider, SimpleAuthGate } from './SimpleAuth'
import './index.css'

// Simple path-based routing
// Protected by simple password authentication
function Router() {
  const path = window.location.pathname

  if (path === '/results') {
    return <ResultsDashboard />
  }

  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SimpleAuthProvider>
      <SimpleAuthGate>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </SimpleAuthGate>
    </SimpleAuthProvider>
  </React.StrictMode>,
)

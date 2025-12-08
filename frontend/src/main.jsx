import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ResultsDashboard from './ResultsDashboard'
import { AuthProvider } from './AuthContext'
import './index.css'

// Simple path-based routing
// Auth is available via AuthProvider but not required by default
function Router() {
  const path = window.location.pathname

  if (path === '/results') {
    return <ResultsDashboard />
  }

  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ResultsDashboard from './ResultsDashboard'
import './index.css'

// Simple path-based routing
function Router() {
  const path = window.location.pathname

  if (path === '/results') {
    return <ResultsDashboard />
  }

  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)

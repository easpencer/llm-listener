import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AppSimplified from './AppSimplified'
import './index.css'

// URL-based A/B test routing
// ?v=simple → Simplified version (just message + concerns)
// ?v=full or default → Full version (all analysis cards)
const params = new URLSearchParams(window.location.search)
const version = params.get('v')

const AppComponent = version === 'simple' ? AppSimplified : App

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppComponent />
  </React.StrictMode>,
)

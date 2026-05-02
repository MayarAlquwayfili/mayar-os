import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// No React Router — the shell is a single-page app only; PDF and other static files
// under `public/` are emitted beside `index.html` at deploy time and must not be routed as SPA HTML.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

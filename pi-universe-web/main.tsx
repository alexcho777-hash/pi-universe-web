import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Initialise the Pi SDK before anything calls Pi.authenticate().
// VITE_PI_SANDBOX=true only when testing in a desktop browser via the Pi sandbox URL.
if (window.Pi) {
  window.Pi.init({ version: '2.0', sandbox: import.meta.env.VITE_PI_SANDBOX === 'true' })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

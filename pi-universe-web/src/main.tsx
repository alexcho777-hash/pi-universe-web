import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Initialise the Pi SDK before anything calls Pi.authenticate().
// VITE_PI_SANDBOX=true only when testing in a desktop browser via the Pi sandbox URL.
if (window.Pi) {
  window.Pi.init({ version: '2.0', sandbox: import.meta.env.VITE_PI_SANDBOX === 'true' })
}

// Wake the API as soon as the app opens. On a sleeping Render instance the first request can take
// a minute, longer than Pi allows for approving a payment — warming it up here, while the person is
// still browsing, avoids "Payment expired" on the first donation. Best-effort; failures are ignored.
try {
  const api = import.meta.env.VITE_API_URL || 'https://pi-universe-api.onrender.com'
  fetch(`${api}/health`, { mode: 'no-cors', cache: 'no-store' }).catch(() => {})
  window.setInterval(() => fetch(`${api}/health`, { mode: 'no-cors', cache: 'no-store' }).catch(() => {}), 8 * 60 * 1000)
} catch {
  /* ignore */
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

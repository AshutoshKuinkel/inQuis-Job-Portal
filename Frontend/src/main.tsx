import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import QCProvider from './providers/query-client.provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QCProvider>
      <App />
    </QCProvider>
  </StrictMode>,
)

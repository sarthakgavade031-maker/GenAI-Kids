import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LangProvider } from './LangContext.jsx'
import { ProgressProvider } from './ProgressContext.jsx'
import { AuthProvider } from './AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <LangProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </LangProvider>
    </AuthProvider>
  </StrictMode>,
)
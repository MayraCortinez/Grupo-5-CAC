import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { StrictMode } from 'react'
import AuthProvider from './context/AuthProvider.jsx'
import { ProtectedProvider } from './context/ProtectedProvider.jsx'
import { PrivateProvider } from './context/PrivateProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
          <App />
  </StrictMode>,
)

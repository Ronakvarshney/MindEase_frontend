import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <GoogleOAuthProvider clientId='894082879067-8otnfhkjnqv81g1s0s53o83m94ddrqud.apps.googleusercontent.com'>
   <App />
   </GoogleOAuthProvider>
   
  </BrowserRouter>


)

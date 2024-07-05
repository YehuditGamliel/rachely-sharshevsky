import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import EyeglassesProvider from './hook/EyeglassesProvider.jsx'
import PaperProvider from './hook/PaperProvider.jsx'
import UserProvider from './hook/UserProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
  <PaperProvider>
  <EyeglassesProvider >
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </EyeglassesProvider>
  </PaperProvider>
  </UserProvider>,
  
)

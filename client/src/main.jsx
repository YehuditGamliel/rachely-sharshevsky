import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import EyeglassesProvider from './EyeglassesProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <EyeglassesProvider >
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </EyeglassesProvider>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import EyeglassesProvider from './EyeglassesProvider.jsx'
import PaperProvider from './PaperProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <PaperProvider>
  <EyeglassesProvider >
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </EyeglassesProvider>
  </PaperProvider>,
  
)

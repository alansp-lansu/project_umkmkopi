import React from 'react'
import ReactDOM from 'react-dom/client'
// Hapus import BrowserRouter karena sudah ada di App.jsx
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
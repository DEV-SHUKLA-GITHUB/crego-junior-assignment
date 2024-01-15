import React from 'react'
import ReactDOM from 'react-dom/client'
import ExpressionEngineUI from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ExpressionEngineUI />
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // បន្ថែមការ Import នេះ
import App from './app/App'
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* ត្រូវស្រោប App ជាមួយ BrowserRouter នៅទីនេះ */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
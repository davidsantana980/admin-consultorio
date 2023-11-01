import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<App/>} />
        {/* <Route path='/agregar' element={<AgregarPaciente/>} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

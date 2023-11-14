
import { Routes, Route } from 'react-router'
import './index.css'
import NavBar from './NavBar'
import CitasPaciente from './vistas/Citas'
import Index from './vistas/Index'
import React from 'react'
import AgregarPaciente from './vistas/AgregarPaciente'

export default class  App extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return (
      <>
        <NavBar/>
        <Routes>
          <Route path='*' element={<Index/>} />
          <Route path='/citas' element={<CitasPaciente />} />
          <Route path='/agregar-paciente' element={<AgregarPaciente/>} />
        </Routes>
      </>
    )
  }
}

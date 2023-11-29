
import { Routes, Route } from 'react-router'
import './index.css'
import NavBar from './componentes/NavBar.jsx'
import CitasPaciente from './componentes/Citas.jsx'
import Index from './vistas/Index'
import React from 'react'
import AgregarPaciente from './vistas/AgregarPaciente'
import Paciente from './vistas/Paciente'
import ListaPacientes from './vistas/ListaPacientes.jsx'

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
          <Route path='/agregar-paciente' element={<AgregarPaciente/>} />
          <Route path='/paciente/:idPaciente' element={<Paciente/>} />
          <Route path='/resultados' element={<ListaPacientes/>} />
        </Routes>
      </>
    )
  }
}

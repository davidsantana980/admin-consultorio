
import { Routes, Route } from 'react-router'
import './index.css'
import NavBar from './componentes/NavBar.jsx'
import CitasPaciente from './componentes/Citas.jsx'
import Index from './vistas/Index'
import React from 'react'
import AgregarPaciente from './vistas/AgregarPaciente'
import Paciente from './vistas/Paciente'
import ListaPacientes from './vistas/ListaPacientes.jsx'
import Login from './vistas/Login.jsx'
import { borraTokenIfUnauth, getToken, tokenHeader } from './utilidades/funciones.js'

export default class  App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tokenHeader  : {
        headers: {
          Authorization: "",
        },
      }
    }
  }

  componentDidMount() {
    if(getToken != null) {
      setInterval(this.chequeoJWT, 300000);
    }
  }

  async chequeoJWT() {
     try {
        const res = await fetch("http://localhost:8080/api/usuarios", tokenHeader);
        borraTokenIfUnauth(res)
    } catch (e) {
        console.log(e);
    }
  }
  
  componentWillUnmount(){
    clearTimeout(this.chequeo)
  }

  render(){
    if(!!getToken()){
      return (
        <>
          <NavBar/>
          <Routes>
            <Route path='*' element={<Index />} />
            <Route path='/agregar-paciente' element={<AgregarPaciente />} />
            <Route path='/paciente/:idPaciente' element={<Paciente />} />
            <Route path='/resultados' element={<ListaPacientes />} />
          </Routes>
        </>
      )
    }else{
      return (
        <Routes>
          <Route path='*' element={<Login/>} />
        </Routes>
      )
    }
  }
}


// // import { Routes, Route } from 'react-router'
// // import './index.css'
// // import NavBar from './componentes/NavBar.jsx'
// // import CitasPaciente from './componentes/Citas.jsx'
// // import Index from './vistas/Index'
// // import React from 'react'
// // import AgregarPaciente from './vistas/AgregarPaciente'
// // import Paciente from './vistas/Paciente'
// // import ListaPacientes from './vistas/ListaPacientes.jsx'

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
// // import './index.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import CitasPaciente from './componentes/Citas.jsx';
// import AuthProvider, {    useAuth  } from "./utilidades/AuthProvider";
// import RouteProtect from "./utilidades/RouteProtect.jsx";
// import Login from './vistas/Login.jsx';
// import AgregarPaciente from './vistas/AgregarPaciente.jsx';
// import Index from './vistas/Index.jsx';
// import Paciente from './vistas/Paciente.jsx';
// import ListaPacientes from './vistas/ListaPacientes.jsx';

// export default class  App extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = {}
//   }

//   Routes = () => {
//     const { token } = useAuth();
  
//     const RutasPublicas = [
//       {
//         path : "/",
//         element : <Login />
//       }
//     ]
  
//     const RutasPrivadas = [
//       {
//         path : "*",
//         element : <RouteProtect/>
//       },
//       {
//         path : "/",
//         element : <Index />
//       },
//       {
//         path : "/agregar-paciente",
//         element : <AgregarPaciente/>
//       },{
//         path : "/paciente/:idPaciente",
//         element : <Paciente />
//       },{
//         path : "/resultados",
//         element : <ListaPacientes/>
//       }
//     ]
    
//     const Router = createBrowserRouter([
//       ...RutasPublicas,
//       ...(!token ? RutasPrivadas : [])
//     ])
  
//     return <RouterProvider router={Router} />;
//   };

//   render(){
//     const {Routes} = this;

//     return (
//       // <>
//       //   <NavBar/>
//       //   <Routes>
//       //     <Route path='*' element={<Index/>} />
//       //     <Route path='/agregar-paciente' element={<AgregarPaciente/>} />
//       //     <Route path='/paciente/:idPaciente' element={<Paciente/>} />
//       //     <Route path='/resultados' element={<ListaPacientes/>} />
//       //   </Routes>
//       // </>
//       <AuthProvider>
//         <Routes/>
//       </AuthProvider>
//     )
//   }
// }

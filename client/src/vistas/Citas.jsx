import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useLocation } from "react-router";

class CitasComponente extends React.Component{  
    pacienteModelo = {
        idPaciente : 0,
        nombrePaciente : "",
        apellidoPaciente : "",
        cedulaPaciente : "",
        telefonoPaciente : "",
        historia : {
            idHistoria : 0,
            urlDocumentoHistoria : ""
        },
        citas : []
    }

    constructor(props = {paciente : this.pacienteModelo}){
        super(props)
        this.state = {
            paciente : props.paciente ,
            // paciente : {
            //     "idPaciente": 7,
            //     "nombrePaciente": "Cesar",
            //     "apellidoPaciente": "Augusto",
            //     "cedulaPaciente": "2",
            //     "telefonoPaciente": "",
            //     "historia": {
            //         "idHistoria": 7,
            //         "urlDocumentoHistoria": "http://localhost:8080/api/historias/1590161261277.jpg",
            //         "nombreDocumentoHistoria": null
            //     },
            //     "citas": [         
            //         {
            //             "idCita": 50,
            //             "fechaCita": "2023-11-07",
            //             "estudios": [
            //                 {
            //                     "idEstudio": 14,
            //                     "urlNotasEstudio": "http://localhost:8080/api/citas/IMG_0001.PNG",
            //                     "nombreDocumentoEstudio": "IMG_0001.PNG",
            //                     "tipoDeEstudio": {
            //                         "idTipoEstudio": 1,
            //                         "nombreTipo": "Endoscopia"
            //                     }
            //                 }
            //             ]
            //         },
            //             {
            //             "idCita": 54,
            //             "fechaCita": "2023-11-08",
            //             "estudios": [
            //                 {
            //                     "idEstudio": 17,
            //                     "urlNotasEstudio": "http://localhost:8080/api/citas/IMG_5860.jpg",
            //                     "nombreDocumentoEstudio": "IMG_5860.jpg",
            //                     "tipoDeEstudio": {
            //                         "idTipoEstudio": 2,
            //                         "nombreTipo": "Colonoscopia"
            //                     }
            //                 },
            //                 {
            //                     "idEstudio": 18,
            //                     "urlNotasEstudio": "http://localhost:8080/api/citas/IMG_5861.jpg",
            //                     "nombreDocumentoEstudio": "IMG_5861.jpg",
            //                     "tipoDeEstudio": {
            //                         "idTipoEstudio": 1,
            //                         "nombreTipo": "Endoscopia"
            //                     }
            //                 }
            //             ]
            //         }
            //     ]
            // },
            tiposDeEstudio : [""]
        }
    }

    componentDidMount(){
        let estudiosUnicos = new Set()
        let citas = this.state.paciente.citas.forEach(cita => {
            estudiosUnicos.add(cita.estudios.map(estudio => estudio.tipoDeEstudio.nombreTipo))
        })

        // this.props.a = "b"
        // console.log(this.props)

        // this.setState({estudios : estudiosUnicos})
    }

    estudioModelo = {
        idEstudio : 0,
        urlNotasEstudio : "",
        tipoDeEstudio : {
            idTipoEstudio : 0,
            nombreTipo : ""
        }
    }

    citaModelo = {
        idCita : 0,
        fechaCita : new Date(),
        estudios : []
    }

    Citas() {
        let citas = this.state.paciente.citas;

        return citas.map(cita => {
            let BotonEstudio = () => { 
                if(!!cita.estudios.length){
                    // let botones = new Set(cita.estudios.map(estudio => estudio.tipoDeEstudio.nombreTipo))
                    // return botones.forEach(boton => (<Button>{boton}</Button>))

                    let botones = cita.estudios.map(estudio => (<Button className="m-0" variant="light" >{estudio.tipoDeEstudio.nombreTipo}</Button>))
                
                    return (
                        <Container>
                            {botones}
                        </Container>                    
                    )
                }
                return <p> Ninguno </p>;
            }

            return (
                <tr>
                    <td>
                        {cita.idCita}
                    </td>
                    <td>
                        {cita.fechaCita}
                    </td>
                    <td>
                        {/* { */}
                            {/* // !!botonEstudio() ? */}
                            <BotonEstudio/>
                            {/* // : */}
                            {/* // <p> */}
                            {/* //     Ninguno */}
                            {/* // </p> */}
                        {/* } */}
                    </td>
                    <td>
                        <Button>Edita esta cita</Button>
                    </td>
                </tr>
            )
        })
    }

    render(){
        let Citas = () => this.Citas();

        return (
            <Container>
                <Table responsive hover bordered striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Fecha</th>
                            <th>Estudio(s)</th>
                            <th>Modificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Citas/>
                    </tbody>
                </Table>
            </Container>
        )
    }
}

export default function CitasPaciente(props) {
    const {state} = useLocation()
    return (
        <CitasComponente paciente={state} {...props}/>
    )
}
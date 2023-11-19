import React from "react";
import { pacienteModelo } from "../utilidades/modelos";
import { Col, Container } from "react-bootstrap";
import CitasPaciente from "../componentes/Citas.jsx";
import { useLocation, useParams } from "react-router";
import AdvertenciaModal from "../modales/AdvertenciaModal.jsx";

class ClasePaciente extends React.Component{
    constructor(props = {
            idPaciente : 0
        }
    ){
        super(props)
        this.idPaciente = props.idPaciente
        this.state = {
            paciente : pacienteModelo,
            advertenciaModal : {
                mensaje : "",
                show : false,
                funcion : () => {}
            }
        }
    }

    borraPaciente(idPaciente = 0){
        try{
            fetch(`http://localhost:8080/api/pacientes?idPaciente=${idPaciente}`, {
                method: 'DELETE'
            })
            .then(res => {
                if(res.ok){
                    window.location.reload()
                }else{
                    throw new Error("no se pudo borrar el paciente")
                }
            })
        }catch(e){
            console.log(e)
        }
    }
    
    fetchPaciente(){
        try{
            fetch(`http://localhost:8080/api/pacientes/id?idPaciente=${this.idPaciente}`)
            .then(res => {
                return res.json()
            })
            .then((resJson) => {
                this.setState({paciente : resJson})
            })
        }catch(e){
            console.log(e);
        }
    }

    componentDidMount(){
        try{
            this.fetchPaciente();
        }catch(e){
            console.log(e);
        }
    }

    render(){
        let {paciente} = this.state;

        let setBorraPaciente = () => {
            this.setState({
                ...this.state,
                advertenciaModal : {
                    mensaje : "¿Seguro de que quieres borrar este paciente?", 
                    funcion : () => borraPaciente(paciente.idPaciente),
                    show : true
                }
            })
        }
    

        return(
            <Container>
                <Col>
                    <Container>
                        <h1 className="display-3">
                            {`${paciente.nombrePaciente} ${paciente.apellidoPaciente}`}
                        </h1>
                        <hr/>
                    </Container>
                    
                    <CitasPaciente citas={paciente.citas} />
                </Col>
                <AdvertenciaModal
                    mensaje={this.state.advertenciaModal.mensaje}
                    show = {this.state.advertenciaModal.show}
                    funcion={this.state.advertenciaModal.funcion}
                    onHide={() => this.setState({ ...this.state, advertenciaModal : {...this.state.advertenciaModal, show : false}})}
                />
            </Container>
        )
    }
}

export default function Paciente (props){
        const {idPaciente} = useParams()

        return (
            <ClasePaciente idPaciente={idPaciente} {...props}/>
        )
}
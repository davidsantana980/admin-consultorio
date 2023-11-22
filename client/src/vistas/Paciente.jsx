import React from "react";
import { pacienteModelo } from "../utilidades/modelos";
import { Button, ButtonGroup, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import CitasPaciente from "../componentes/Citas.jsx";
import { useLocation, useParams } from "react-router";
import AdvertenciaModal from "../modales/AdvertenciaModal.jsx";
import { borraHistoria, descargarArchivo } from "../utilidades/funciones.js";
import HistoriaModal from "../modales/HistoriaModal";
import PacienteModal from "../modales/PacienteModal.jsx";
import AgregarCitaModal from "../modales/AgregarCitaModal.jsx";

class ClasePaciente extends React.Component{
    constructor(props = {
            idPaciente : 0
        }
    ){
        super(props)
        this.idPaciente = props.idPaciente
        this.state = {
            paciente : pacienteModelo,
            pacienteModal : {
                paciente : {},
                modoForm : true,
                show: false
            },
            advertenciaModal : {
                mensaje : "",
                show : false,
                funcion : () => {}
            },
            historiaModal : {
                paciente : {},
                rewrite: false, 
                show: false
            },
            agregarCitaModal : {
                paciente : {},
                show : false
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

    handleDescarga(paciente = pacienteModelo){
        try{
            descargarArchivo(paciente.historia.urlDocumentoHistoria)
        }catch(e){
            console.log(e)
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

        let setBorraHistoria = () => {
            this.setState({
                ...this.state,
                advertenciaModal : {
                    mensaje : "¿Seguro de que quieres borrar esta historia?", 
                    funcion : () => borraHistoria(paciente.historia),
                    show : true
                }
            })
        }

        let setAgregarCita = () => {
            this.setState({
                ...this.state,
                agregarCitaModal : {
                    paciente : paciente,
                    show : true
                }
            })
        }

        return(
            <Container>
                {/* <Container> */}
                    <h1 className="display-3">
                        {`${paciente.nombrePaciente} ${paciente.apellidoPaciente}`}
                    </h1>
                    <hr/>
                {/* </Container> */}
                <Row>
                    <Col lg={8}>
                        {/* <Container> */}
                            <CitasPaciente citas={paciente.citas} />
                        {/* </Container> */}
                    </Col>
                    <Col lg={4}>
                        <Row>
                            <Container>
                                <Card className="mt-2">
                                    <Card.Body>
                                        <Card.Title className="d-flex justify-content-between align-items-center">
                                            Datos personales
                                            <Button size="sm" onClick={() => this.setState({pacienteModal : {paciente : paciente, show : true, modoForm :true}})}>
                                                Cambiar datos
                                            </Button>
                                        </Card.Title>
                                        <ListGroup className="mt-3">
                                            {
                                                !!paciente.cedulaPaciente && <ListGroup.Item className="list-group-item">Cédula: {paciente.cedulaPaciente}</ListGroup.Item>
                                            }
                                            {
                                                !!paciente.telefonoPaciente && <ListGroup.Item className="list-group-item">Teléfono: {paciente.telefonoPaciente}</ListGroup.Item>
                                            }
                                        </ListGroup>
                                    </Card.Body>
                                    <Card.Footer>
                                        <ButtonGroup className="w-100">
                                            {
                                                paciente.historia ?
                                                    <>
                                                        <Button onClick={() => this.handleDescarga(paciente)}>
                                                            Descargar historia
                                                        </Button>
                                                        <Button className="border" variant="light" onClick={() => this.setState({historiaModal : {paciente : paciente, rewrite : true, show : true}})}>
                                                            Modificar historia
                                                        </Button>
                                                        <Button variant="danger" onClick={setBorraHistoria}>
                                                            Borrar historia
                                                        </Button>
                                                    </>
                                                :
                                                <Button onClick={() => this.setState({historiaModal : {paciente : paciente, show : true}})}>
                                                    Agregar historia
                                                </Button>
                                            }
                                        </ButtonGroup>
                                    </Card.Footer>
                                        {/* <ListGroup.Item className="list-group-item">{paciente.historia}</ListGroup.Item> */}
                                </Card>
                            </Container>
                            <ButtonGroup className="w-100 mt-2">
                                <Button onClick={setAgregarCita}>Agregar cita</Button>
                            </ButtonGroup>
                            <ButtonGroup className="mt-2">
                                <Button variant="danger" onClick={setBorraPaciente}>Borrar paciente</Button>
                            </ButtonGroup>
                        </Row>
                    </Col>
                </Row>
                <AdvertenciaModal
                    mensaje={this.state.advertenciaModal.mensaje}
                    show = {this.state.advertenciaModal.show}
                    funcion={this.state.advertenciaModal.funcion}
                    onHide={() => this.setState({ ...this.state, advertenciaModal : {...this.state.advertenciaModal, show : false}})}
                />
                <HistoriaModal
                    paciente={this.state.historiaModal.paciente}
                    rewrite={this.state.historiaModal.rewrite}
                    show = {this.state.historiaModal.show}
                    onHide={() => this.setState({historiaModal : {...this.state.historiaModal, show :false}})}
                />
                <PacienteModal 
                    paciente={this.state.pacienteModal.paciente}
                    show = {this.state.pacienteModal.show}
                    modoForm={this.state.pacienteModal.modoForm}
                    setModoForm={(val = false) => this.setState({pacienteModal : {...this.state.pacienteModal, show :false, modoForm :true}})}
                    //oculta 
                    onHide={() => {
                        this.setState({pacienteModal : {...this.state.pacienteModal, show :false, modoForm :true}})
                    }}
                />
                <AgregarCitaModal 
                    paciente={this.state.agregarCitaModal.paciente}
                    show = {this.state.agregarCitaModal.show}
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
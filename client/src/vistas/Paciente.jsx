import React from "react";
import { pacienteModelo } from "../utilidades/modelos";
import { Button, ButtonGroup, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import CitasPaciente from "../componentes/Citas.jsx";
import { useNavigate, useParams } from "react-router";
import AdvertenciaModal from "../modales/AdvertenciaModal.jsx";
import { borraHistoria, descargarArchivo } from "../utilidades/funciones.js";
import HistoriaModal from "../modales/HistoriaModal";
import PacienteModal from "../modales/PacienteModal.jsx";
import AgregarCitaModal from "../modales/AgregarCitaModal.jsx";
import { Link } from "react-router-dom";

class ClasePaciente extends React.Component{
    constructor(props = {
            idPaciente : 0,
            nav : () => {}
        }
    ){
        super(props)
        this.idPaciente = props.idPaciente,
        this.nav=props.nav
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
                    this.nav("/", {replace : true})
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
            if(!parseInt(this.idPaciente)) throw new Error("9903094182h")
            
            fetch(`http://localhost:8080/api/pacientes/id?idPaciente=${this.idPaciente}`)
            .then(res => {
                if (res.status == 204 || !res.ok) throw new Error()
                return res.json()
            })
            .then((resJson) => {
                if (!Object.values(resJson)) throw new Error()
                this.setState({paciente : resJson})
            })
            .catch(e => {
                return this.nav("/", {replace : true})
            })

        }catch(e){
            return this.nav("/", {replace : true})
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
                    funcion : () => this.borraPaciente(paciente.idPaciente),
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

        const UltimaCita = () => {
            if(!!paciente && !!paciente.citas && !!paciente.citas.length){
                const ultimaCita = new Date(Math.max(...paciente.citas.map(cita => new Date(cita.fechaCita))));
                return(
                    <ListGroup.Item className="text-white bg-info">
                        Ultima cita: {ultimaCita.toLocaleDateString('es-US', {timeZone: 'UTC'})}
                    </ListGroup.Item>
                )
            }else{
                return 
            }
        };

        const DatosDelPaciente = (props = {className : ""}) => {
            return (
                <Container {...props}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="d-flex justify-content-between align-items-center">
                                Datos personales
                                <Button size="sm" onClick={() => this.setState({pacienteModal : {paciente : paciente, show : true, modoForm :true}})}>
                                    Cambiar datos
                                </Button>
                            </Card.Title>
                            <ListGroup className="mt-3">
                                <UltimaCita />
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
                    </Card>
                </Container>
            )
        }

        const Botonera = (props = {size : undefined, className : ""}) => {
            return (
                <div className={props.className}>
                    <ButtonGroup className="w-100 mt-2">
                        <Button size={props.size} onClick={setAgregarCita}>Agregar cita</Button>
                    </ButtonGroup>
                    <ButtonGroup className="w-100 mt-2">
                        <Button size={props.size} variant="danger" onClick={setBorraPaciente}>Borrar paciente</Button>
                    </ButtonGroup>
                </div>
            )
        }

        const Body = () => {
            if(!!paciente.citas.length){
                return (
                    <Row className="mt-2">
                        <Col lg={8}>
                            <CitasPaciente citas={paciente.citas} />
                        </Col>
                        <Col lg={4}>
                            <Row>
                                <DatosDelPaciente/>
                                <Botonera/>
                            </Row>
                        </Col>
                    </Row>
                )
            }else{
                return (
                    <Row>
                        <Col lg={8}>
                            <Row>
                                <Botonera size={"lg"} className="mb-3 w-100"/>
                            </Row>
                        </Col>
                        <Col lg={4}>
                            <Row>
                                <DatosDelPaciente className="mt-2"/>
                            </Row>
                        </Col>
                    </Row>
                )
            }
        }

        return(
            <Container>
                <h1 className="display-4">
                    {`${paciente.nombrePaciente} ${paciente.apellidoPaciente}`}
                </h1>
                <hr className="mt-2" />
                <Body />
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
                    onHide={() => {
                        this.setState({agregarCitaModal : {...this.state.agregarCitaModal, show :false}})
                    }}
                />
            </Container>
        )
    }
}

export default function Paciente (props){
        const {idPaciente} = useParams()
        const nav = useNavigate()
        return (
            <ClasePaciente idPaciente={idPaciente} {...props} nav={nav}/>
        )
}
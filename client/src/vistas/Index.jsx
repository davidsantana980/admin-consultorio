import {useState, React, Component} from "react";
import { Container , Card, Button, Col, Row, ButtonGroup} from "react-bootstrap";
import PacienteModal from "../modales/PacienteModal";
import { Link } from "react-router-dom";
import HistoriaModal from "../modales/HistoriaModal";

export default class Index extends Component {
    constructor(props){
        super(props);
        this.state={
            pacientes : [],
            cargando : true,
            pacienteModal : {
                paciente : {},
                modoForm : false,
                show: false
            },
            historiaModal : {
                paciente : {},
                rewrite: false, 
                show: false
            }
        }
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

    fetchPacientes(){
        try{
            fetch("http://localhost:8080/api/pacientes")
            .then(res => {
                return res.json()
            })
            .then((resJson = []) => {
                this.setState({pacientes : resJson, cargando : false})
            })
        }catch(e){
            console.log(e);
        }
    }

    handleDescarga(paciente = this.pacienteModelo){
        try{
            fetch(paciente.historia.urlDocumentoHistoria)
            .then(res => {
                if(res.ok){
                    window.location.assign(paciente.historia.urlDocumentoHistoria)
                }else{
                    throw new Error("no se pudo acceder al archivo")
                }
            })
        }catch(e){
            console.log(e)
        }
    }

    componentDidMount(){
        try{
            this.fetchPacientes();
        }catch(e){
            console.log(e);
        }
    }

    render(){
        const {cargando, pacientes} = this.state;

        let Pacientes = () => pacientes.map((paciente) => {
                return ( 
                    <Col lg="3" md="6"> 
                        <Card className="w-100 my-2 shadow-2-strong">
                            <Card.Header className="btn text-center shadow-none" onClick={() => this.setState({pacienteModal : {paciente : paciente, show : true}})}>
                                <Card.Title className="mt-1">
                                    {`${paciente.nombrePaciente} ${paciente.apellidoPaciente}`} 
                                </Card.Title>
                            </Card.Header>
                            <Card.Footer className="d-grid gap-2">
                                {
                                    paciente.historia 
                                    ?
                                    <ButtonGroup>
                                        <Button onClick={() => this.handleDescarga(paciente)}>
                                            Descargar historia
                                        </Button>
                                        <Button className="border" variant="light" onClick={() => this.setState({historiaModal : {paciente : paciente, rewrite : true, show : true}})}>
                                            Modificar historia
                                        </Button>
                                    </ButtonGroup>
                                    :
                                    <Button onClick={() => this.setState({historiaModal : {paciente : paciente, show : true}})}>
                                        Agregar historia
                                    </Button>
                                }
                                {
                                    paciente.citas.length !== 0 
                                    ?
                                    <Link className="btn btn-dark" to={"/citas"} replace state={{...paciente}} >
                                        Ver citas
                                    </Link>
                                    :
                                    <Button>
                                        Agregar cita
                                    </Button>
                                }
                            </Card.Footer>
                        </Card>
                    </Col>
                )
            })

        if(cargando){
            return (
                <Container>
                    <p className="display-3 text-center">Cargando...</p>
                </Container>
            )
        }

        return(
            <Container>
                <Row className="mt-3">
                    <Pacientes/>
                    <PacienteModal 
                        paciente={this.state.pacienteModal.paciente}
                        show = {this.state.pacienteModal.show}
                        modoForm={this.state.pacienteModal.modoForm}
                        setModoForm={(val = false) => this.setState({pacienteModal : {...this.state.pacienteModal, modoForm : val}})}
                        //oculta 
                        onHide={() => {
                            this.setState({pacienteModal : {...this.state.pacienteModal, show :false}})
                        }}
                    />
                    <HistoriaModal
                        paciente={this.state.historiaModal.paciente}
                        rewrite={this.state.historiaModal.rewrite}
                        show = {this.state.historiaModal.show}
                        onHide={() => this.setState({historiaModal : {paciente : {} , rewrite : false, show :false}})}
                    />
                </Row>
            </Container>
        )
    }
}
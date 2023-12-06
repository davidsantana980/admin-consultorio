import { React, Component} from "react";
import { Container , Card, Button, Col, Row, ButtonGroup} from "react-bootstrap";
import PacienteModal from "../modales/PacienteModal";
import { Link } from "react-router-dom";
import HistoriaModal from "../modales/HistoriaModal";
import { borraTokenIfUnauth, descargarArchivo, tokenHeader } from "../utilidades/funciones";
import { pacienteModelo } from "../utilidades/modelos";
import AgregarCitaModal from "../modales/AgregarCitaModal";
// import instance from "../utilidades/axiosConfig"

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
            },
            agregarCitaModal : {
                paciente : {},
                show : false
            }
        }
    }

    fetchPacientes(){
        try{
            fetch("http://localhost:8080/api/pacientes/busca-todo", tokenHeader)
            .then(res => {
                borraTokenIfUnauth(res)

                if(!!res.ok){
                    return res.json()
                }
            })
            .then((resJson = []) => {
                if(!!resJson.length){
                    this.setState({pacientes : resJson, cargando : false})
                }else{
                    return //this.nav("/agregar-paciente", {replace : true})
                }
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
                            <Link className="card-header" to={`/paciente/${paciente.idPaciente}`} replace>
                                <Card.Title className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover text-center mt-1">
                                    {`${paciente.nombrePaciente} ${paciente.apellidoPaciente}`} 
                                </Card.Title>
                            </Link>

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
                                    <ButtonGroup>
                                        <Button onClick={() => this.setState({historiaModal : {paciente : paciente, show : true}})}>
                                            Agregar historia
                                        </Button>
                                        <Button onClick={() => {this.setState({agregarCitaModal : {paciente : paciente,show : true}})}}>
                                            Agregar cita/estudio
                                        </Button>
                                    </ButtonGroup>
                                }
                                <Button variant="light" className="border" onClick={() => this.setState({pacienteModal : {paciente : paciente, show : true}})}>
                                    Resumen
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                )
            })

        if(cargando){
            return (
                <Container fluid className="col-lg-8">
                    <h1 className="display-4 mt-2 text-center">
                        Cargando...
                    </h1>
                    <hr/>
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
                        onHide={() => this.setState({historiaModal : {...this.state.historiaModal, show :false}})}
                    />
                    <AgregarCitaModal 
                        paciente={this.state.agregarCitaModal.paciente}
                        show = {this.state.agregarCitaModal.show}
                        onHide={() => {
                            this.setState({agregarCitaModal : {...this.state.agregarCitaModal, show :false}})
                        }}
                    />
                </Row>
            </Container>
        )
    }
}
import {  Component } from "react"
import { Button, ButtonGroup, ButtonToolbar, Card, CardGroup, Col, Container, Row } from "react-bootstrap"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"
import { pacienteModelo } from "../utilidades/modelos";
import PacienteModal from "../modales/PacienteModal";
import { tokenHeader, borraTokenIfUnauth } from "../utilidades/funciones";

class ListaPacientesClass extends Component{
    constructor(props = {query : ""}) {
        super(props);
        this.pacienteQuery = props.query;
        this.nav = () => {}
        this.state = {
            pacientes : [pacienteModelo],
            cargando : true,
            pacienteModal : {
                paciente : {},
                modoForm : false,
                show: false
            },
            mensaje : "Espere..."
        };
    }

    buscaPaciente = () => {
        let {pacienteQuery} = this

        if(!pacienteQuery) return false;

        let splitQuery = pacienteQuery.split(" ");
        let nombrePaciente = ""
        let apellidoPaciente = ""

        splitQuery = splitQuery.filter(i => !!i)

        if(!splitQuery.length) return false;

        if(splitQuery.length >= 2){
            nombrePaciente =splitQuery[0]  
            apellidoPaciente =splitQuery[1] 
        }else{
            nombrePaciente =splitQuery[0]  
            apellidoPaciente =splitQuery[0] 
        }

        return fetch(`http://localhost:8080/api/pacientes?nombrePaciente=${nombrePaciente}&apellidoPaciente=${apellidoPaciente}`, tokenHeader)
        .then(res => {
            borraTokenIfUnauth(res)

            if(res.ok && res.status != 204){
                return res.json()
            }else{
                return false;
            }
        })
    }

    async componentDidMount(){
        try{
            const resJson = await this.buscaPaciente();

            if(!!resJson && typeof resJson === "object" && Object.keys(resJson).length >= 1){
                return this.setState({
                    pacientes: resJson,
                    cargando : false
                })
            }else{
                return this.setState({
                    mensaje : "No se encontraron pacientes"
                })
            }
        }catch(error){
            console.log(error)
            this.setState({
                dataIsLoaded:true //changed status
            })
        }
    }

    render(){        
        if(!this.state.cargando){
            let Pacientes = () => this.state.pacientes.map((paciente, index) => {
                const ultimaCita = (paciente.citas && !!paciente.citas.length) ? new Date(Math.max(...paciente.citas.map(cita => new Date(cita.fechaCita)))) : 0;

                return (
                        <Container fluid key={index} className="mb-2">
                            <Card key={index} className="text-center">
                                <Card.Body>
                                    <Row >
                                        <Col>
                                            <Container fluid>
                                                <Card.Title className="d-grid gap-2">
                                                    <ButtonToolbar className="text-justify-center">
                                                        <Button style={!!ultimaCita ? {width:"70%"} : {width:"100%"}} className="mt-2 stretched-link btn-lg shadow-none btn-light" onClick={() => this.setState({pacienteModal : {paciente : paciente, show : true}})}>
                                                            {`${paciente.nombrePaciente} ${paciente.apellidoPaciente}`}
                                                        </Button>
                                                        {
                                                            !!ultimaCita &&
                                                            <p className="my-3" style={{width:"30%"}}>
                                                                Ultima cita: {ultimaCita.toLocaleDateString('es-US', {timeZone: 'UTC'})}
                                                            </p>
                                                        }
                                                    </ButtonToolbar>
                                                </Card.Title>
                                            </Container>    
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Container>
                )
            })

            return (
                <>
                    <Container fluid className="col-lg-8">
                        <h1 className="display-4 mt-2 text-center">
                            Resultados:
                        </h1>
                        <hr/>
                    </Container>
                    <Container className="border col-md-12 col-lg-8 mb-5" >
                        <CardGroup className="mt-3">
                            <Pacientes />
                        </CardGroup>
                    </Container>
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
                </>
            ) 


        }


        return (
            <Container fluid className="col-lg-8">
                <h1 className="display-4 mt-2 text-center">
                    {this.state.mensaje}
                </h1>
                <hr/>
            </Container>
        )
    }
}

export default function ListaPacientes(props){
    const params = new URLSearchParams(location.search)
    const query = params.get("nombre")

    return (
        <ListaPacientesClass query={query} />
    )
}
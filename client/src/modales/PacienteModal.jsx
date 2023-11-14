import { Button, ButtonToolbar, Card, ListGroup, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function handleDescarga(paciente){
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

export default function PacienteModal(props = {
    paciente : {
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
    },
    show: false
}){
    const {paciente} = props;
    // const navigate = useNavigate();

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Card>
                <Card.Header>
                    <Card.Title>
                        {`${paciente.nombrePaciente} ${paciente.apellidoPaciente}`}
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <ListGroup>
                        <ListGroup.Item>
                            <Card.Text>
                                C.I: {paciente.cedulaPaciente}
                            </Card.Text>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Card.Text>
                                Teléfono: {paciente.telefonoPaciente}
                            </Card.Text>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Card.Link>
                                <ButtonToolbar className="d-flex justify-content-center">
                                    <Button className="mx-2" onClick={() => handleDescarga(paciente)}>
                                        Descargar historia
                                    </Button>
                                    <Link className="btn btn-primary" to={"/citas"} replace state={{...paciente}} >
                                        Ver citas
                                    </Link>
                                    <Button className="mx-2">
                                        Agregar cita
                                    </Button>
                                </ButtonToolbar>
                            </Card.Link>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Modal>
    )
}
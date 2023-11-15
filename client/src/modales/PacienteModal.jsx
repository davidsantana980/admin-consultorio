import { Button, ButtonToolbar, Card, Container, ListGroup, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AdvertenciaModal from "./AdvertenciaModal";
import { useState } from "react";

function borraHistoria(historia = {
    idHistoria : 0,
    urlDocumentoHistoria : ""
}){
    try{
        fetch(`http://localhost:8080/api/historias?idHistoria=${historia.idHistoria}`, {
            method: 'DELETE'
        })
        .then(res => {
            if(res.ok){
                window.location.reload()
            }else{
                throw new Error("no se pudo borrar el archivo")
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
    const [advertenciaModal, setAdvertenciaModal] = useState({
        mensaje : "",
        show : false,
        funcion : () => {}
    })

    let setBorraHistoria = () => {
        setAdvertenciaModal(
            {
                mensaje : "¿Seguro de que quieres borrar esta historia?", 
                funcion : () => borraHistoria(paciente.historia),
                show : true
            }
        )
    }

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Card>
                    <Card.Header>
                        <Card.Title className="my-2">
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
                                    <Container className="d-flex justify-content-center">
                                        <Button variant="danger" className="mx-2" onClick={setBorraHistoria}>
                                            Borrar historia
                                        </Button>
                                        <Button variant="secondary" className="mx-2">
                                            Editar datos
                                        </Button>
                                        <Link className="btn btn-primary mx-2" to={"/citas"} replace state={{...paciente}} >
                                            Ver citas
                                        </Link>
                                        {/* <Button className="mx-2">
                                            Agregar cita
                                        </Button> */}
                                        </Container>
                                </Card.Link>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Modal>
            <AdvertenciaModal 
                mensaje={advertenciaModal.mensaje}
                show = {advertenciaModal.show}
                funcion={advertenciaModal.funcion}
                onHide={() => setAdvertenciaModal({ mensaje : "", funcion : undefined, show : false})}
            />
        </> 
    )
}
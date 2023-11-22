import { Button, Card, Container, ListGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdvertenciaModal from "./AdvertenciaModal";
import { useState } from "react";
import PacienteForm from "../componentes/PacienteForm";
import { pacienteModelo } from "../utilidades/modelos";
import { borraHistoria } from "../utilidades/funciones";

export default function PacienteModal(props = {
    paciente : pacienteModelo,
    modoForm :false,
    setModoForm : () => {},
    show: false
}){
    const {paciente} = props;
    
    const [advertenciaModal, setAdvertenciaModal] = useState({
        mensaje : "",
        show : false,
        funcion : () => {}
    })

    const {modoForm, setModoForm} = props

    const PacienteInfo = () => {
        return (
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
                                    <Button variant="secondary" onClick={() => setModoForm(true)} className="mx-2">
                                        Editar datos
                                    </Button>
                                    <Link className="btn btn-primary mx-2" to={`/paciente/${paciente.idPaciente}`} replace >
                                        Citas y estudios
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
        )
    }

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
            {
                modoForm ? 
                <PacienteForm paciente={paciente} modoForm={modoForm} setModoForm={setModoForm}  /> 
                :
                <PacienteInfo/>
            }
            </Modal>
            <AdvertenciaModal 
                mensaje={advertenciaModal.mensaje}
                show = {advertenciaModal.show}
                funcion={advertenciaModal.funcion}
                onHide={() => setAdvertenciaModal({ ...advertenciaModal, show : false})}
            />
        </> 
    )
}
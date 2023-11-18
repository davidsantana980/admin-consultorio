import { Button, ButtonToolbar, Card, Col, Container, Form, ListGroup, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AdvertenciaModal from "./AdvertenciaModal";
import { useEffect, useState } from "react";
import PacienteForm from "../componentes/PacienteForm";

const pacienteModelo = {
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

function borraPaciente(idPaciente = 0){
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

export default function PacienteModal(props = {
    paciente : pacienteModelo,
    modoForm :false,
    setModoForm : () => {},
    show: false
}){
    const {paciente} = props;
    // const {paciente : pacienteInfo1} = props;
    // const [paciente, setPaciente] = useState(pacienteInfo1 || undefined)
    // const [paciente, setPacienteInfo] = useState(pacienteInfo1 || undefined)

    // useEffect(() => {
    //     setPacienteInfo(pacienteInfo1)
    //     setPaciente(pacienteInfo1)
    // }, [props.paciente])
    
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
                                    <Button variant="danger" className="mx-2" onClick={setBorraPaciente}>
                                        Borrar paciente
                                    </Button>
                                    <Button variant="danger" className="mx-2" onClick={setBorraHistoria}>
                                        Borrar historia
                                    </Button>
                                    <Button variant="secondary" onClick={() => setModoForm(true)} className="mx-2">
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

    let setBorraPaciente = () => {
        setAdvertenciaModal(
            {
                mensaje : "¿Seguro de que quieres borrar este paciente?", 
                funcion : () => borraPaciente(paciente.idPaciente),
                show : true
            }
        )
    }

    // let setEditaPaciente = async () => {
    //     const respuesta = await editarPaciente(paciente.idPaciente, paciente) 
    //     if(respuesta != null){
    //         setPaciente({...respuesta})
    //         setModoForm(false)
    //     }
    // }

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
                onHide={() => setAdvertenciaModal({ mensaje : "", funcion : undefined, show : false})}
            />
        </> 
    )
}
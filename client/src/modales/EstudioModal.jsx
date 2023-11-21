import { Button, Card, Container, ListGroup, Modal } from "react-bootstrap";
import { estudioModelo } from "../utilidades/modelos";
import { descargarArchivo } from "../utilidades/funciones";
import { useState } from "react";
import AdvertenciaModal from "./AdvertenciaModal";
import EditarEstudioForm from "../componentes/EditarEstudioForm";

export default function EstudioModal(props = {
        estudio : estudioModelo, 
        show : false, 
        fecha : new Date(), 
        modoForm : false, 
        setModoForm : () => {},
        setEstudioInfo : () => {}
    }
){
    const {estudio, fecha, setEstudioInfo} = props;
    const {modoForm, setModoForm} = props;

    const [advertenciaModal, setAdvertenciaModal] = useState({
        mensaje : "",
        show : false,
        funcion : () => {}
    })

    const borrarEstudio = (idEstudio = 0) => {
        try{
            fetch(`http://localhost:8080/api/citas/estudios?idEstudio=${idEstudio}`, {
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

    let setBorraEstudio = () => {
        setAdvertenciaModal(
            {
                mensaje : "¿Seguro de que quieres borrar este estudio?", 
                funcion : () => borrarEstudio(estudio.idEstudio),
                show : true
            }
        )
    }

    const descargarEstudio = () => {
        try{
            descargarArchivo(estudio.urlNotasEstudio)
        }catch(e){
            console.log(e)
        }
    }

    const EstudioInfo = () => {
        return (
            <Card>
                <Card.Header>
                    <Card.Title className="my-2">
                        {`${estudio.tipoDeEstudio.nombreTipo} del ${fecha}`}
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <ListGroup>
                        <ListGroup.Item>
                            <Card.Link>
                                <Container className="d-flex justify-content-center">
                                    <Button variant="danger" className="mx-2" onClick={setBorraEstudio}>
                                        Borrar estudio
                                    </Button>
                                    <Button variant="info" className="mx-2" onClick={descargarEstudio}>
                                        Descargar archivo
                                    </Button>
                                    <Button onClick={() => setModoForm(true)}>
                                        Editar estudio
                                    </Button>
                                </Container>
                            </Card.Link>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
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
                !modoForm ? 
                    <EstudioInfo/>
                :
                    <EditarEstudioForm estudio={estudio} setModoForm={setModoForm} setEstudioInfo={setEstudioInfo} />
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
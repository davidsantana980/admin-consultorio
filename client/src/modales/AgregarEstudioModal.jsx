import { useState } from "react";
import { citaModelo, estudioAuxModelo, estudioModelo } from "../utilidades/modelos";
import { Button, Card, ListGroup, Modal, Form, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

function enviarEstudio(idCita = 0, estudioAux = estudioAuxModelo){
    try{
        if(!idCita || !estudioAux.tipoDeEstudio || !estudioAux.archivoEstudio.length) throw new Exception("error creando el estudio")

        const formdata = new FormData();
        formdata.append("tipoDeEstudio", estudioAux.tipoDeEstudio);
        formdata.append("archivoEstudio", estudioAux.archivoEstudio[0]);

        return fetch(`http://localhost:8080/api/citas/estudios?idCita=${idCita}`, {
            method: "POST",
            body: formdata,
            // redirect: 'follow'
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result)
            return result
        })
    }catch(e){
        console.log(e)
    }
}

export default function AgregarEstudioModal(props = {
    cita : citaModelo,
    show : false
}){
    const {cita} = props;
    const [estudioAux, setEstudioAux] = useState(estudioAuxModelo);

    const handleSubmit = () => {
        enviarEstudio(cita.idCita, estudioAux)
    }
    
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Card>
                <Card.Header>
                    <Card.Title className="my-2">
                        {`Agrega un estudio para la cita del ${cita.fechaCita}`}
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <ListGroup>
                        <ListGroup.Item>
                            <Form name="form">
                                <Form.Group>
                                    {/* <Form.Label  className="input-group-text" htmlFor="tipoDeEstudio">Tipo de estudio</Form.Label> */}
                                    <select className="form-control" required onChange={(evt) => setEstudioAux({...estudioAux, tipoDeEstudio : evt.target.value})} type="text" id="tipoDeEstudio" name="tipoDeEstudio">
                                        <option value="">Tipo de estudio</option>
                                        <option value="1">Endoscopia</option>
                                        <option value="2">Colonoscopia</option>
                                    </select>
                                </Form.Group>
                                <Form.Group className="mt-2">
                                    <InputGroup>
                                        <InputGroupText className="input-group-text" htmlFor="archivoEstudio">Estudio</InputGroupText>
                                        <Form.Control required onChange={(evt) => setEstudioAux({...estudioAux, archivoEstudio : evt.target.files})} type="file" id="archivoEstudio" name="archivoEstudio"/>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Control onClick={handleSubmit} className="mt-2" as={Button}>
                                    Agregar
                                </Form.Control>
                            </Form>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Modal>
    )
}
import { useState } from "react";
import { Button, ButtonToolbar, Card, ListGroup, Modal, Form, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { Link, useNavigate } from "react-router-dom";
import { enviarHistoria } from "../utilidades/funciones";

export default function HistoriaModal(props = {
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
    rewrite : false,
    show: false
}){
    const {paciente} = props;
    const [historia, setHistoria] = useState([]);

    const handleSubmit = async () => {
        try {
            await enviarHistoria(paciente.idPaciente, historia, props.rewrite)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
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
                        {`${!props.rewrite ? "Agrega" : "Sobreescribe"} la historia de ${paciente.nombrePaciente} ${paciente.apellidoPaciente}`}
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <ListGroup>
                        <ListGroup.Item>
                            <Form name="form">
                                <InputGroup>
                                    <InputGroupText className="input-group-text" htmlFor="historia">Historia (opcional)</InputGroupText>
                                    <Form.Control required onChange={(evt) => setHistoria(evt.target.files)} type="file" id="historia" name="historia"/>
                                </InputGroup>
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
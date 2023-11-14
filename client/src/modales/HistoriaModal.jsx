import { useState } from "react";
import { Button, ButtonToolbar, Card, ListGroup, Modal, Form, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { Link, useNavigate } from "react-router-dom";
import { enviarHistoria } from "../utilidades/funciones";

// function handleDescarga(paciente){
//     try{
//         fetch(paciente.historia.urlDocumentoHistoria)
//         .then(res => {
//             if(res.ok){
//                 window.location.assign(paciente.historia.urlDocumentoHistoria)
//             }else{
//                 throw new Error("no se pudo acceder al archivo")
//             }
//         })
//     }catch(e){
//         console.log(e)
//     }
// }

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
    show: false
}){
    const {paciente} = props;
    const [historia, setHistoria] = useState([]);

    const handleSubmit = async () => {
        try {
            await enviarHistoria(paciente.idPaciente, historia)
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
                    <Card.Title>
                        {`Agrega o sobreescribe la historia de ${paciente.nombrePaciente} ${paciente.apellidoPaciente}`}
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

                                {/* <div class="input-group mb-3">
                                    <label class="input-group-text" for="inputGroupFile01">Upload</label>
                                    <input type="file" class="form-control" id="inputGroupFile01">
                                </div> */}
                            </Form>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Modal>
    )
}
import { useState } from "react";
import { estudioAuxModelo, estudioModelo } from "../utilidades/modelos";
import { Button, Card, ListGroup, Modal, Form, InputGroup , Container} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";

function editarEstudio(idEstudio = 0, estudioAux = estudioAuxModelo){
    try{
        if(!idEstudio) throw new Exception("error creando el estudio")

        const formdata = new FormData();
        if(!!estudioAux.tipoDeEstudio) formdata.append("tipoDeEstudio", estudioAux.tipoDeEstudio);
        if(!!estudioAux.archivoEstudio.length) formdata.append("archivoEstudio", estudioAux.archivoEstudio[0]);

        return fetch(`http://localhost:8080/api/citas/estudios?idEstudio=${idEstudio}`, {
            // headers: {
            //     "Content-Type": "multipart/form-data",
            //     // 'Content-Type': 'application/x-www-form-urlencoded',
            // },
            method: "PUT",
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

export default function EditarEstudioForm(props = {
    estudio : estudioModelo,
    setEstudioInfo : () => {},
    setModoForm : () => {}
}){
    const {estudio, setEstudioInfo, setModoForm} = props;
    const [estudioAux, setEstudioAux] = useState(estudioAuxModelo);

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        const edit = await editarEstudio(estudio.idEstudio, estudioAux)
        if (edit) window.location.reload();
    }
    
    return (
        <Card as={Form}>
            <Card.Header>
                <Card.Title className="my-2">
                    { `Actualiza esta ${estudio.tipoDeEstudio.nombreTipo}`}
                </Card.Title>
            </Card.Header>
            <Card.Body>
                <ListGroup>
                    <ListGroup.Item>
                        <Form name="form">
                            <Form.Group>
                                {/* <Form.Label  className="input-group-text" htmlFor="tipoDeEstudio">Tipo de estudio</Form.Label> */}
                                <select className="form-control" onChange={(evt) => setEstudioAux({...estudioAux, tipoDeEstudio : evt.target.value})} type="text" id="tipoDeEstudio" name="tipoDeEstudio">
                                    <option value="">Tipo de estudio</option>
                                    <option value="1">Endoscopia</option>
                                    <option value="2">Colonoscopia</option>
                                </select>
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <InputGroup>
                                    <InputGroupText className="input-group-text" htmlFor="archivoEstudio">Estudio</InputGroupText>
                                    <Form.Control onChange={(evt) => setEstudioAux({...estudioAux, archivoEstudio : evt.target.files})} type="file" id="archivoEstudio" name="archivoEstudio"/>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                <Container className="d-flex justify-content-center">
                                    <Form.Control as={Button} variant="secondary" className="mx-2 mt-2" onClick={() => setModoForm(false)}>
                                        Cancelar 
                                    </Form.Control>
                                    <Form.Control onClick={handleSubmit} className="mx-2 mt-2" as={Button}>
                                        Guardar
                                    </Form.Control>
                                </Container>

                            </Form.Group>
                        </Form>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}
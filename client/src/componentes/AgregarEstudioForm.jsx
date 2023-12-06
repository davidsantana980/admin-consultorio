import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { estudioAuxModelo } from "../utilidades/modelos";
import { Button, Card, InputGroup, Modal, Form } from "react-bootstrap";

export default function AgregarEstudioForm(props = {
    handleSubmit : () => {},
    estudioAux : estudioAuxModelo,
    setEstudioAux : () => {},
    required : true
}){
    const {handleSubmit, estudioAux, setEstudioAux, required} = props;

    return(
        <Form name="form">
            <Form.Group>
                <select className="form-control" required={required} onChange={(evt) => setEstudioAux({...estudioAux, tipoDeEstudio : evt.target.value})} type="text" id="tipoDeEstudio" name="tipoDeEstudio">
                    <option value="">Tipo de estudio</option>
                    <option value="1">Endoscopia</option>
                    <option value="2">Colonoscopia</option>
                </select>
            </Form.Group>
            <Form.Group className="mt-2">
                <InputGroup>
                    <InputGroupText className="input-group-text" htmlFor="archivoEstudio">Estudio</InputGroupText>
                    <Form.Control required={required} onChange={(evt) => setEstudioAux({...estudioAux, archivoEstudio : evt.target.files})} type="file" id="archivoEstudio" name="archivoEstudio"/>
                </InputGroup>
            </Form.Group>
            <Form.Control onClick={handleSubmit} className="mt-2" as={Button}>
                Agregar
            </Form.Control>
        </Form>
    )
}
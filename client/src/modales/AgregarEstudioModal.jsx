import { useState } from "react";
import { citaModelo, estudioAuxModelo, estudioModelo } from "../utilidades/modelos";
import { Button, Card, ListGroup, Modal, Form, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { enviarEstudio } from "../utilidades/funciones";
import AgregarEstudioForm from "../componentes/AgregarEstudioForm";

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
                    <AgregarEstudioForm
                        estudioAux={estudioAux}
                        setEstudioAux={setEstudioAux}
                        handleSubmit={handleSubmit}
                        required={true}
                    />
                </Card.Body>
            </Card>
        </Modal>
    )
}
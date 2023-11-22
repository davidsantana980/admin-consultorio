import { estudioAuxModelo, pacienteModelo } from "../utilidades/modelos";
import { Button, Card, ListGroup, Modal, Form, InputGroup } from "react-bootstrap";
import { enviarEstudio } from "../utilidades/funciones";
import { useState } from "react";
import AgregarEstudioForm from "../componentes/AgregarEstudioForm";

export default function AgregarCitaModal(props = {
    show : false,
    paciente : pacienteModelo
}){
    const {show, paciente} = props;
    const [estudioAux, setEstudioAux] = useState(estudioAuxModelo);
    const handleSubmit = async () => {
        let requestOptions = {
            method: 'POST',
        };   

        if((estudioAux != null) && (estudioAux.tipoDeEstudio == 1 || estudioAux.tipoDeEstudio == 2) && !!estudioAux.archivoEstudio.length){
            const formdata = new FormData();
            formdata.append("tipoDeEstudio", estudioAux.tipoDeEstudio);
            formdata.append("archivoEstudio", estudioAux.archivoEstudio[0]);

            requestOptions.body = formdata
        }

        let res = await fetch(`http://localhost:8080/api/citas?idPaciente=${paciente.idPaciente}`, requestOptions)

        if(res.ok) return window.location.reload()
        
        return false;
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
                        {`Opcional: Agrega un estudio para esta cita`}
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <AgregarEstudioForm 
                        estudioAux={estudioAux}
                        setEstudioAux={setEstudioAux}
                        required={false}
                        handleSubmit={handleSubmit}
                    />
                </Card.Body>
            </Card>
        </Modal>
    )
}
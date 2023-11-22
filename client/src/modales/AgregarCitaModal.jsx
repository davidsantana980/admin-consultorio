import { estudioAuxModelo, pacienteModelo } from "../utilidades/modelos";
import { Card, Modal } from "react-bootstrap";
import { useState } from "react";
import AgregarEstudioForm from "../componentes/AgregarEstudioForm";
import { useNavigate } from "react-router";

export default function AgregarCitaModal(props = {
    show : false,
    paciente : pacienteModelo
}){
    const {show, paciente} = props;
    const [estudioAux, setEstudioAux] = useState(estudioAuxModelo);
    const nav = useNavigate()
    let estaEnPaciente = /^\/paciente\/\d+$/.test(location.pathname);

    const handleSubmit = async (evt) => {
        evt.preventDefault()

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

        if(res.ok) return estaEnPaciente ? window.location.reload() : nav(`/paciente/${paciente.idPaciente}`)
        
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
                        {`Opcional: Agrega un estudio para la nueva cita`}
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
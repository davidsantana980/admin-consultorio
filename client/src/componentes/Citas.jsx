import React, { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useLocation } from "react-router";
import { citaModelo, estudioModelo, pacienteModelo } from "../utilidades/modelos.js";
import EstudioModal from "../modales/EstudioModal.jsx";

export default function CitasPaciente(props = {citas : [citaModelo]}){  
    const {citas} = props;

    const [estudioModal, setEstudioModal] = useState({
        show : false, 
        estudio : estudioModelo, 
        fecha : new Date()
    })

    const [agregarEstudioModal, setAgregarEstudioModal] = useState({
        cita : citaModelo,
        rewrite: false, 
        show: false
    })

    let Citas = () => {
        return citas.map(cita => {
            let BotonEstudio = () => { 
                if(!!cita.estudios.length){
                    let botones = cita.estudios.map(estudio => (<Button onClick={() => {setEstudioModal({show : true, estudio : estudio, fecha : cita.fechaCita})}} className="btn-outline-info m-0" variant="light" >{estudio.tipoDeEstudio.nombreTipo}</Button>))
                
                    return (
                        <Container>
                            {botones}
                        </Container>                    
                    )
                }
            
                return (
                    <Container>
                        <p style={{pointerEvents : "none"}} className="btn btn-default m-0"> Ninguno </p>
                    </Container>
                );
            }

            return (
                <tr>
                    <td>
                        {cita.idCita}
                    </td>
                    <td>
                        {cita.fechaCita}
                    </td>
                    <td>
                        <BotonEstudio/>
                    </td>
                    <td>
                        <Button onClick={() => setAgregarEstudioModal({cita : cita, show : true})}>Agrega un estudio</Button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <Container>
            <Table responsive hover bordered striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Estudio(s)</th>
                        <th>Modificar</th>
                    </tr>
                </thead>
                <tbody>
                    <Citas/>
                </tbody>
            </Table>
            <EstudioModal 
                estudio={estudioModal.estudio}
                show={estudioModal.show}
                fecha={estudioModal.fecha}
                onHide={() => setEstudioModal({...estudioModal, show : false})}
            />
        </Container>
    )
}
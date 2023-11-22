import React, { useState } from "react";
import { Button, ButtonGroup, Container, Table } from "react-bootstrap";
import { useLocation } from "react-router";
import { citaModelo, estudioModelo, pacienteModelo } from "../utilidades/modelos.js";
import EstudioModal from "../modales/EstudioModal.jsx";
import AgregarEstudioModal from "../modales/AgregarEstudioModal.jsx";
import AdvertenciaModal from "../modales/AdvertenciaModal.jsx";

function borraCita(idCita = 0){
    try{
        fetch(`http://localhost:8080/api/citas?idCita=${idCita}`, {
            method: 'DELETE'
        })
        .then(res => {
            if(res.ok){
                window.location.reload()
            }else{
                throw new Error("no se pudo borrar la cita")
            }
        })
    }catch(e){
        console.log(e)
    }
}

export default function CitasPaciente(props = {citas : [citaModelo]}){  
    const {citas} = props;

    const [estudioModal, setEstudioModal] = useState({
        show : false, 
        modoForm : false, 
        estudio : estudioModelo, 
        fecha : new Date()
    })

    const [agregarEstudioModal, setAgregarEstudioModal] = useState({
        cita : citaModelo,
        rewrite: false, 
        show: false,
    })

    const [advertenciaModal, setAdvertenciaModal] = useState({
        funcion : () => {},
        mensaje : "",
        show : false
    })

    let Citas = () => {
        return citas.map(cita => {
            let BotonEstudio = () => { 
                if(!!cita.estudios.length){
                    let botones = cita.estudios.map(estudio => (<Button onClick={() => {setEstudioModal({show : true, estudio : estudio, fecha : cita.fechaCita})}} className="btn-outline-info m-0 mx-1" variant="light" >{estudio.tipoDeEstudio.nombreTipo}</Button>))
                
                    return (
                        <ButtonGroup className="w-100">
                            {botones}
                        </ButtonGroup>                    
                    )
                }
            
                return (
                    <Container>
                        <p style={{pointerEvents : "none"}} className="btn btn-default m-0"> Ninguno </p>
                    </Container>
                );
            }

            return (
                <tr className="text-center">
                    <td>
                        <Container>
                            {cita.idCita}
                        </Container>
                    </td>
                    <td>
                        <Container>
                            {cita.fechaCita}
                        </Container>
                    </td>
                    <td>
                        <BotonEstudio/>
                    </td>
                    <td>
                        <Container>
                            <Button onClick={() => setAgregarEstudioModal({cita : cita, show : true})}>Agrega un estudio</Button>
                        </Container>
                    </td>
                    <td className="text-center"> 
                        <Button variant="light" className="btn btn-outline-danger" onClick={() => setAdvertenciaModal({mensaje : "¿Seguro de que quieres borrar esta cita y sus estudios?", show : true, funcion : () => borraCita(cita.idCita)})}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                            </svg>
                        </Button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div id="citas">
            <Table responsive hover bordered striped>
                <thead>
                    <tr className="text-center">
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Estudio(s)</th>
                        <th>Modificar</th>
                        <th>Borrar</th>
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
                modoForm={estudioModal.modoForm}
                setModoForm={(val = false) => setEstudioModal({...estudioModal, modoForm : val})}
                setEstudioInfo={(estudio = estudioModelo) => setEstudioModal({...estudioModal, estudio: estudio})}
                onHide={() => setEstudioModal({...estudioModal, show : false})}
            />
            <AgregarEstudioModal 
                cita={agregarEstudioModal.cita}
                rewrite={agregarEstudioModal.rewrite}
                show={agregarEstudioModal.show}
                onHide={() => setAgregarEstudioModal({...agregarEstudioModal, show : false})}
            />
            <AdvertenciaModal 
                funcion={advertenciaModal.funcion}
                show={advertenciaModal.show}
                mensaje={advertenciaModal.mensaje}
                onHide={() => setAdvertenciaModal({...advertenciaModal, show:false})}
            />
        </div>
    )
}
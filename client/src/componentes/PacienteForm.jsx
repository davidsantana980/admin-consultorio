import { useState } from "react";
// import {Redirect} from "react-router-dom"
import { Button, Card, Container, Form, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { pacienteModelo } from "../utilidades/modelos";

function editarPaciente(idPaciente = 0, pacienteAModificar = pacienteModelo){
    try{
        const formdata = new FormData();
        formdata.append("nombrePaciente", pacienteAModificar.nombrePaciente);
        formdata.append("apellidoPaciente", pacienteAModificar.apellidoPaciente);
        formdata.append("cedulaPaciente", pacienteAModificar.cedulaPaciente);
        formdata.append("telefonoPaciente", pacienteAModificar.telefonoPaciente);

        return fetch(`http://localhost:8080/api/pacientes?idPaciente=${idPaciente}`, {
            method: 'PUT',
            body : formdata
        })
        .then(res => {
            if(res.ok){
                return res.ok;                
                // return <Redirect to={"/paciente"} state={{...paciente}} />
            }else{
                throw new Error("no se pudo editar")
            }
        })
    }catch(e){
        console.log(e)
        return null;
    }
}

export default function PacienteForm(
    props = {
        paciente : pacienteModelo,
        modoForm : false,
        setPacienteInfo : () => {},
        setModoForm : () => {}
    }
)  {
    const {setPacienteInfo} = props; 
    const {modoForm, setModoForm} = props;
    const [paciente, setPaciente] = useState(props.paciente)
    const nav = useNavigate()

    let handleChange = (evt) => {
        const inputName = evt.target.name
        const inputValue = evt.target.value;
    
        setPaciente({
            ...paciente,
            [inputName]: inputValue
        });
    }

    return (
        <Card as={Form}>
            <Card.Header>
                <Card.Text className="input-group my-2">
                    <Form.Floating style={{width:"50%"}}>
                        <Form.Control id="nombrePaciente" onChange={handleChange} name="nombrePaciente" value={`${paciente.nombrePaciente}`} defaultValue={`${paciente.nombrePaciente}`} />
                        <Form.Label htmlFor="nombrePaciente" >Nombre: </Form.Label>
                    </Form.Floating>
                    <Form.Floating style={{width:"50%"}}>
                        <Form.Control id="apellidoPaciente" onChange={handleChange} name="apellidoPaciente" value={`${paciente.apellidoPaciente}`} defaultValue={`${paciente.apellidoPaciente}`} />
                        <Form.Label htmlFor="apellidoPaciente" >Apellido: </Form.Label>
                    </Form.Floating>
                </Card.Text>
            </Card.Header>
            <Card.Body>
                <ListGroup>
                    <ListGroup.Item >
                        <Card.Text as={Form.Floating}>
                            <Form.Control id="cedulaPaciente" onChange={handleChange} name="cedulaPaciente" value={`${paciente.cedulaPaciente}`} defaultValue={`${paciente.cedulaPaciente}`} />
                            <Form.Label htmlFor="cedulaPaciente" >Cédula: </Form.Label>
                        </Card.Text>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Card.Text as={Form.Floating}>
                            <Form.Control id="telefonoPaciente" onChange={handleChange} name="telefonoPaciente" value={`${paciente.telefonoPaciente}`} defaultValue={`${paciente.telefonoPaciente}`} />
                            <Form.Label htmlFor="telefonoPaciente" >Teléfono: </Form.Label>
                        </Card.Text>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Card.Link>
                            <Container className="d-flex justify-content-center">
                                <Button variant="primary" className="mx-2" onClick={() => setModoForm(false)}>
                                    Cancelar 
                                </Button>
                                <Button variant="secondary" className="mx-2" onClick={async () => {
                                    const ok = await editarPaciente(paciente.idPaciente, paciente)
                                    let estaEnPaciente = /^\/paciente\/\d+$/.test(location.pathname);
                                    if (ok) estaEnPaciente ? window.location.reload() : nav(`/paciente/${paciente.idPaciente}`)
                                }}>
                                    Guardar datos
                                </Button>
                            </Container>
                        </Card.Link>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}
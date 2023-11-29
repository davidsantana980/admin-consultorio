import { useState } from "react"
import { Button, Container, Form, FormGroup, Nav, NavDropdown, Navbar, NavbarCollapse } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"


export default function NavBar(){
    const [pacienteQuery, setPacienteQuery] = useState("");
    const nav = useNavigate()

    return(
        <Navbar expand="lg" sticky="top" bg="dark" variant='dark' className='mb-2'>
            <Container>
                <Navbar.Brand>
                    <Nav.Link>
                        <Link to={"/"} style={{textDecoration : "none", color:"white"}}>Portal</Link>
                    </Nav.Link>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav>
                        <Nav.Item>
                            <Link to={"/agregar-paciente"} className="nav-link" >Agregar paciente</Link>
                        </Nav.Item>
                        <Nav.Item>
                        <NavDropdown
                            title="Buscar paciente"
                            menuVariant="dark"
                        >
                            <Form action="/resultados" id="buscarProducto" className="mx-2 text-center">
                                <FormGroup className="mb-2">
                                    <Form.Control type="text" name="nombre" value={pacienteQuery} onChange={(evt) => setPacienteQuery(evt.target.value)} placeholder="Paciente" />
                                </FormGroup>       
                                <Button className="btn btn-primary w-100" type="submit">
                                    Buscar
                                </Button>
                            </Form>
                        </NavDropdown>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                Cerrar sesion
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
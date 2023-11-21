import { Button, Container, Form, FormGroup, Nav, NavDropdown, Navbar, NavbarCollapse } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function NavBar(){
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
                            <Nav.Link>
                                <Link to={"/agregar-paciente"} style={{textDecoration : "none", color:"white"}}>Agregar paciente</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <NavDropdown
                            title="Buscar paciente"
                            menuVariant="dark"
                        >
                            <NavDropdown.Item>
                                <Form id="buscarProducto" >
                                    <FormGroup className="mb-2">
                                        <Form.Control type="text" name="nombre" placeholder="Paciente" />
                                    </FormGroup>       
                                    <Container fluid className="d-grid mt-1">
                                        <Button type="submit">Buscar</Button>
                                    </Container>
                                </Form>
                            </NavDropdown.Item>   
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
import { Button, Container, Form, FormGroup, Nav, NavDropdown, Navbar } from "react-bootstrap"

export default function NavBar(){
    return(
        <Navbar expand="lg" sticky="top" bg="dark" variant='dark' className='mb-2'>
            <Container>
                <Nav>
                    <Navbar.Brand>
                        Portal
                    </Navbar.Brand>
                    <Nav.Item >
                        <Nav.Link>
                            Agregar paciente
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
            </Container>
        </Navbar>
    )
}
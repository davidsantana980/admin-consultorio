import React from "react";
import { Container , Card, Button, Col, Row} from "react-bootstrap";

export default class Index extends React.Component {
    constructor(props){
        super(props);
        this.state={
            pacientes : [            
                {
                    nombre: "Juan Orozco" 
                },
                {
                    nombre: "Kala Martinez"
                },
                {
                    nombre: "Pedrique Martinez"
                },
                {
                    nombre: "Juan Zapata"
                },
                {
                    nombre: "Orlando Roso"
                },
                {
                    nombre: "Juan Orozco" 
                },
                {
                    nombre: "Kala Martinez"
                },
                {
                    nombre: "Pedrique Martinez"
                },
                {
                    nombre: "Juan Zapata"
                },
                {
                    nombre: "Orlando Roso"
                }
            ]
        }
    }

    render(){
        let Pacientes = () => this.state.pacientes.map(paciente => {
                return ( 
                    <Col lg="3" md="6" sm="6"> 
                        <Card>
                            <Container>
                                <Card.Title>
                                    {paciente.nombre}
                                </Card.Title>
                                <Card.Footer>
                                    <Button>
                                        Descargar historia
                                    </Button>
                                </Card.Footer>
                            </Container>
                        </Card>
                    </Col>
                )
            })


        return(
            <Container>
                <Row className="mt-3">
                    <Pacientes/>
                </Row>
            </Container>
        )
    }
}
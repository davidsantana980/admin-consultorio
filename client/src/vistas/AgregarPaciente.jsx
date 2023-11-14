import React from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import {enviarHistoria} from "../utilidades/funciones"
import InputGroupText from "react-bootstrap/esm/InputGroupText";
export default class AgregarPaciente extends React.Component{
    pacienteModelo = {
        nombrePaciente : "",
        apellidoPaciente : "",
        cedulaPaciente : "",
        telefonoPaciente : "",
    }

    constructor(props){
        super(props)
        this.state = {
            paciente : {
                nombrePaciente : "",
                apellidoPaciente : "",
                cedulaPaciente : "",
                telefonoPaciente : "",
            },
            historia : []
        }
    }

    handleChange = (evt) => {
        const inputName = evt.target.name
        const inputValue = evt.target.value;
    
        this.setState({
            ...this.state,
            paciente : {
                ...this.state.paciente,
                [inputName]: inputValue
            }             
        });
    }

    enviarPaciente() {
        try{
            const paciente = this.state.paciente

            if(!Object.values(this.state.paciente).every(valor => !!valor)){
                throw new Error("Valores incompletos")
            }

            return fetch("http://localhost:8080/api/pacientes", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },              
                body : JSON.stringify(paciente)
            })
            .then(res => {
                return res.json()
            })
            .then((resJson) => {
                // console.log(resJson)
                return resJson
            })
        }catch(e){
            console.log(e)
        }
    }

    handleSubmit = async (evt) => {
        evt.preventDefault()

        const form = evt.currentTarget.form;

        if(!form.checkValidity()){
            console.log("no")
            return
        }

        try{    
            const nuevoPaciente = await this.enviarPaciente();
            console.log(nuevoPaciente)
            // enviarHistori
            if(!!this.state.historia.length) await enviarHistoria(nuevoPaciente.idPaciente, this.state.historia);
        }catch(e){
            console.log(e)
        }

        // console.log(this.state.paciente)
        // console.log(this.state.historia.length)
    }
    
    render(){
        return (
            <Container>
                <Form name="form">
                    <Form.Label className="display-6" >
                            Nuevo paciente:
                    </Form.Label>
                    <Form.Control type="text" placeholder="Nombre" required name="nombrePaciente" value={this.state.paciente.nombrePaciente} onChange={this.handleChange} />
                    <Form.Control type="text" placeholder="Apellido" required name="apellidoPaciente" value={this.state.paciente.apellidoPaciente} onChange={this.handleChange} />
                    <Form.Control type="number" placeholder="Cédula" required name="cedulaPaciente" value={this.state.paciente.cedulaPaciente} onChange={this.handleChange}/>
                    <Form.Control pattern="^\+?\d*$" type="tel" placeholder="Teléfono" name="telefonoPaciente" value={this.state.paciente.telefonoPaciente} onChange={this.handleChange} />
                    <InputGroup>
                        <InputGroupText className="input-group-text" htmlFor="historia">Historia (opcional)</InputGroupText>
                        <Form.Control onChange={(evt) => this.setState({...this.state, historia : evt.target.files})} type="file" id="historia" name="historia"/>
                    </InputGroup>
                    <Form.Control onClick={this.handleSubmit} className="mt-2" as={Button}>
                        Agregar
                    </Form.Control>

                    {/* <div class="input-group mb-3">
                        <label class="input-group-text" for="inputGroupFile01">Upload</label>
                        <input type="file" class="form-control" id="inputGroupFile01">
                    </div> */}
                </Form>
            </Container>
        )
    }
}

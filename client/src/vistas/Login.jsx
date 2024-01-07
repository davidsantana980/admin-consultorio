import React from "react"
import { Form, Button, Container, Alert } from "react-bootstrap";
import { borraTokenIfUnauth, setToken, tokenHeader } from "../utilidades/funciones";

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      usuario: {
        username : "",
        password : ""
      },
      error : ""
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
  
    if(!Object.values(this.state.usuario).every(valor => !!valor)){
      return this.setState({error : "Datos incompletos"})
    }

    const cuerpo = JSON.stringify(this.state.usuario);      
    
    fetch("http://localhost:8080/api/usuarios/login", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: cuerpo,
    })
    .then(response => {
      if(response.ok){
        return response.json()
      }
      throw new Error()
    })
    .then((result) => {
      if(!!result.token) {
        setToken(result.token)         
        location.reload();
      }else{
        throw new Error()
      };
    })
    .catch(error => {
      console.log(error)
      this.setState({error : "Usuario o contraseña incorrectos"})
    });
  };

  render(){
    return(
      <Container className="my-4">
        <Form >
          <Form.Label className="display-4" >
            Inicio de sesión
            <hr/>
          </Form.Label>              
            {
              !!this.state.error &&
              <Alert className="alert-danger" role="alert">
                {this.state.error}
              </Alert>
            }

            <Form.Control type="text" placeholder="Usuario" className="mb-1" required name="username" value={this.state.username} onChange={(evt) => this.setState({usuario : {...this.state.usuario, username : evt.target.value}})} />  
            <Form.Control type="password" placeholder="Contraseña" required name="password" value={this.state.password} onChange={(evt) => this.setState({usuario : {...this.state.usuario, password : evt.target.value}})} />

            <Form.Control type="submit" onClick={this.handleSubmit} className="mt-2" as={Button}>
              Iniciar sesión
            </Form.Control>
        </Form>
      </Container>
    );
  }
}

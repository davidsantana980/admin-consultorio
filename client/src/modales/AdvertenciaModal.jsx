import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AdvertenciaModal (props = {
    mensaje : "",
    funcion : () => {},
    show: false
}) {
    let handleContinuar = () => {
        try {
            if(!!props.funcion){
                props.funcion()
            }else{
                throw new Error()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.mensaje}
                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                {/* <Link to={props.ruta} className="btn btn-danger" state={{project : props.project}}> */}
                <Button variant="danger" onClick={handleContinuar}>
                    Continuar
                </Button>
                {/* </Link> */}
            </Modal.Footer>
        </Modal>
    )
}       
export function enviarHistoria(idPaciente = 0, historia = []){
    try{
        if(!idPaciente || !historia.length) throw new Exception("error creando la historia")

        const formdata = new FormData();
        formdata.append("archivo", historia[0]);

        return fetch(`http://localhost:8080/api/historias?idPaciente=${idPaciente}`, {
            method: 'POST',
            body: formdata,
            // redirect: 'follow'
        })
        .then(res => res.json())
        .then(result => {
            // console.log(result)
            return result
        })
    }catch(e){
        console.log(e)
    }
}


export default {enviarHistoria}
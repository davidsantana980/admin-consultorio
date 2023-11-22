export function enviarHistoria(idPaciente = 0, historia = [], rewrite = false){
    try{
        if(!idPaciente || !historia.length) throw new Exception("error creando la historia")

        const formdata = new FormData();
        formdata.append("archivo", historia[0]);

        return fetch(`http://localhost:8080/api/historias?${!rewrite ? `idPaciente=${idPaciente}` : `idHistoria=${idPaciente}`}`, {
            method: !rewrite ? "POST" : "PUT",
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

export function borraHistoria(historia = {
    idHistoria : 0,
    urlDocumentoHistoria : ""
}){
    try{
        fetch(`http://localhost:8080/api/historias?idHistoria=${historia.idHistoria}`, {
            method: 'DELETE'
        })
        .then(res => {
            if(res.ok){
                window.location.reload()
            }else{
                throw new Error("no se pudo borrar el archivo")
            }
        })
    }catch(e){
        console.log(e)
    }
}

export function descargarArchivo(url = ""){
    try{
        fetch(url)
        .then(res => {
            if(res.ok){
                window.location.assign(url)
            }else{
                throw new Error("no se pudo acceder al archivo")
            }
        })
    }catch(e){
        console.log(e)
    }
}

export function enviarEstudio(idCita = 0, estudioAux = estudioAuxModelo){
    try{
        if(!idCita || !estudioAux.tipoDeEstudio || !estudioAux.archivoEstudio.length) throw new Exception("error creando el estudio")

        const formdata = new FormData();
        formdata.append("tipoDeEstudio", estudioAux.tipoDeEstudio);
        formdata.append("archivoEstudio", estudioAux.archivoEstudio[0]);

        return fetch(`http://localhost:8080/api/citas/estudios?idCita=${idCita}`, {
            method: "POST",
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

export default {enviarHistoria, descargarArchivo, borraHistoria, enviarEstudio}
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

export default {enviarHistoria, descargarArchivo}
export function enviarHistoria(idPaciente = 0, historia = [], rewrite = false){
    try{
        if(!idPaciente || !historia.length) throw new Exception("error creando la historia")

        const formdata = new FormData();
        formdata.append("archivo", historia[0]);

        return fetch(`http://localhost:8080/api/historias?${!rewrite ? `idPaciente=${idPaciente}` : `idHistoria=${idPaciente}`}`, {
            method: !rewrite ? "POST" : "PUT",
            body: formdata,
            ...tokenHeader
        })
        .then(res => {
            borraTokenIfUnauth(res)
            return res.json()
        })
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
            method: 'DELETE',
            ...tokenHeader
//            credentials : "include",
        })
        .then(res => {
            borraTokenIfUnauth(res)

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

export async function descargarArchivo(url = ""){        
        const res = await fetch(url, tokenHeader)
        borraTokenIfUnauth(res)

        const blob = await res.blob()

        const nombreDelArchivo = res.headers.get('Content-Disposition').match(/archivo="([^']*)"/)[1];
        const href = URL.createObjectURL(blob)

        Object.assign(document.createElement('a'), {
            href,
            download: nombreDelArchivo,
        }).click();   

        // .then((res) => res.blob())
        // .then((blob) => URL.createObjectURL(blob))
        // .then((href) => {
        //   Object.assign(document.createElement('a'), {
        //     href,
        //     download: 'filename.csv',
        //   }).click();
        // });
      
    // try{
        // fetch(url, tokenHeader)
        // .then(async (res) => {
        //     borraTokenIfUnauth(res)

        //     const blobArchivo = await res.blob();

        //     return {
        //         header : res.headers.get('Content-Disposition'),
        //         blob : blobArchivo
        //     }
        // })
        // .then(res => {
        //     const nombreDelArchivo = res.header.match(/archivo="([^']*)"/)[1];
        //     return {
        //         nombreDelArchivo : nombreDelArchivo,
        //         objetoURL : URL.createObjectURL(res.blob)
        //     }
        // })
        // .then((res) => {
        //     const { objetoURL, nombreDelArchivo } = res;

        //     Object.assign(document.createElement('a'), {
        //         objetoURL,
        //         download: nombreDelArchivo,
        //     }).click();
        // });

        // .then((blob) => {
        //     return URL.createObjectURL(blob)
        // })
        // .then((href) => {
        //     Object.assign(document.createElement('a'), {
        //         href,
        //         download: 'filename',
        //     }).click();
        // });

        // fetch(url, tokenHeader)
        // .then(res => {
        //     borraTokenIfUnauth(res)

        //     if(res.ok){
        //         window.location.assign(url)
        //     }else{
        //         throw new Error("no se pudo acceder al archivo")
        //     }
        // })
    // }catch(e){
    //     console.log(e)
    // }
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
            ...tokenHeader
        })
        .then(res => {
            borraTokenIfUnauth(res)
            res.json()
        })
        .then(result => {
            // console.log(result)
            return result
        })
    }catch(e){
        console.log(e)
    }
}

export function getToken(){
    return sessionStorage.getItem("token")
}

export function setToken(token = ""){
    return sessionStorage.setItem('token', token)          
}

export function clearToken(){
    return sessionStorage.clear()
}

export const tokenHeader = {
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
}

export function borraTokenIfUnauth(res){
    if(res.status == 401){
        clearToken()
        return location.reload()
    }
}

export default {enviarHistoria, descargarArchivo, borraHistoria, enviarEstudio, getToken, clearToken, tokenHeader, borraTokenIfUnauth, setToken}
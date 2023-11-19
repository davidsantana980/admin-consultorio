export const estudioModelo = {
    idEstudio : 0,
    urlNotasEstudio : "",
    tipoDeEstudio : {
        idTipoEstudio : 0,
        nombreTipo : ""
    }
}

export const citaModelo = {
    idCita : 0,
    fechaCita : new Date(),
    estudios : []
}

export const pacienteModelo = {
    idPaciente : 0,
    nombrePaciente : "",
    apellidoPaciente : "",
    cedulaPaciente : "",
    telefonoPaciente : "",
    historia : {
        idHistoria : 0,
        urlDocumentoHistoria : ""
    },
    citas : []
}


export default {pacienteModelo, estudioModelo, citaModelo}
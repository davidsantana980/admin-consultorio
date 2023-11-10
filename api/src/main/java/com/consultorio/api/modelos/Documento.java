package com.consultorio.api.modelos;

import org.springframework.web.multipart.MultipartFile;

public class Documento {
    MultipartFile archivo;
    String nombre;

    public Documento() {
    }

    public Documento(MultipartFile archivo, String nombre) {
        this.archivo = archivo;
        this.nombre = nombre;
    }

    public MultipartFile getArchivo() {
        return archivo;
    }

    public void setArchivo(MultipartFile archivo) {
        this.archivo = archivo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void ajustaNombreParaGuardar(){
        this.nombre = this.archivo.getOriginalFilename().replaceAll("\\s+", "_");
    }
}

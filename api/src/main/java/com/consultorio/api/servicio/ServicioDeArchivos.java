package com.consultorio.api.servicio;

import java.nio.file.Path;
import java.util.stream.Stream;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface ServicioDeArchivos {
    public void init();

    public void guardar(MultipartFile archivo);

    public Resource cargar(String nombreDelArchivo);

    public boolean borrar(String nombreDelArchivo);

    public void borrarTodo();

    public Stream<Path> cargarTodo();

//    public Path obtenerDirectorio();
}

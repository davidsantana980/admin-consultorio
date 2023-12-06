package com.consultorio.api.servicio;

import java.nio.file.Path;
import java.util.stream.Stream;

import com.consultorio.api.modelos.Documento;
import org.springframework.core.io.Resource;

public interface ServicioDeArchivos {
    public void init(String directorio);

    public String guardar(Documento archivo, Class<?> claseDelControlador, String nombreDelMetodo);

    public Resource cargar(String nombreDelArchivo);

    public boolean borrar(String nombreDelArchivo);

    public void borrarTodo();

    public Stream<Path> cargarTodo();

//    public Path obtenerDirectorio();
}

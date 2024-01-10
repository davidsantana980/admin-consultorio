package com.consultorio.api.servicio;

import com.consultorio.api.modelos.Documento;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

@Service
public class ImplementacionDelServicioDeArchivos implements ServicioDeArchivos{
    private Path raiz;

    @Override
    public void init(String directorio){
        try {
            raiz = Paths.get(directorio);
            Files.createDirectories(raiz);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String guardar(Documento archivo, Class<?> claseDelControlador, String nombreDelMetodo) {
        try {
            archivo.ajustaNombreParaGuardar();

            //guardar archivo
            Files.write(this.raiz.resolve(archivo.getNombre()), archivo.getArchivo().getBytes());

            String nuevoNombre = archivo.getNombre();

            //retornar url
            return MvcUriComponentsBuilder.fromMethodName(claseDelControlador, nombreDelMetodo, nuevoNombre).build().toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    @Override
    public Resource cargar(String nombreDelArchivo) {
        try {
            Path file = raiz.resolve(nombreDelArchivo);
            Resource recurso = new UrlResource(file.toUri());

            if (recurso.exists() || recurso.isReadable()) {
                return recurso;
            } else {
                throw new RuntimeException("Archivo ilegible!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public boolean borrar(String nombreDelArchivo){
        try {
            Path file = raiz.resolve(nombreDelArchivo);
//            Resource recurso = new UrlResource(file.toUri());

//            if (recurso.exists() || recurso.isReadable()) {
              return   Files.deleteIfExists(file);
//            } else {
//                throw new RuntimeException("Archivo ilegible!");
//            }
        } catch (Exception e) {
//            throw new RuntimeException("Error: " + e.getMessage());
            return false;
        }
    }

    @Override
    public void borrarTodo() {
        FileSystemUtils.deleteRecursively(raiz.toFile());
    }

    @Override
    public Stream<Path> cargarTodo() {
        try {
            return Files.walk(this.raiz, 1).filter(path -> !path.equals(this.raiz)).map(this.raiz::relativize);
        } catch (IOException e) {
            throw new RuntimeException("No se pudieron cargar los archivos!");
        }
    }

//    @Override
//    public Path obtenerDirectorio(String nombreDelArchivo){
//        try {
//             if(cargar(nombreDelArchivo).exists()){
//                 return raiz.resolve(nombreDelArchivo);
//             }
//        }catch (Exception e){
//            throw new RuntimeException("Error: " + e.getMessage());
//        }
//    }
}


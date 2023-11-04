package com.consultorio.api.servicio;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

@Service
public class ImplementacionDelServicio implements ServicioDeArchivos{
    private final Path raiz = Paths.get("cargas");

    @Override
    public void init(){
        try {
            Files.createDirectories(raiz);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void guardar(MultipartFile archivo){
        try {
//            Files.copy(archivo.getInputStream(), this.raiz.resolve(archivo.getOriginalFilename()));
            Files.write(this.raiz.resolve(archivo.getOriginalFilename().replaceAll("\\s+", "_")), archivo.getBytes());
        } catch (IOException e) {
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
            throw new RuntimeException("Error: " + e.getMessage());
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

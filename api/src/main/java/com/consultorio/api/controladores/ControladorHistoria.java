package com.consultorio.api.controladores;

import com.consultorio.api.modelos.Documento;
import com.consultorio.api.modelos.Historia;
import com.consultorio.api.modelos.Paciente;
import com.consultorio.api.repositorios.RepositorioHistorias;
import com.consultorio.api.repositorios.RepositorioPacientes;
import com.consultorio.api.servicio.ImplementacionDelServicioDeArchivos;
import com.consultorio.api.servicio.ServicioDeArchivos;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@Controller
@RestController
@RequestMapping(value = "/api/historias", produces = MediaType.APPLICATION_JSON_VALUE)
public class ControladorHistoria {
    private final ServicioDeArchivos servicioDeArchivos;
    private final RepositorioHistorias repositorioHistorias;
    private final RepositorioPacientes repositorioPacientes;

    @Autowired
    ControladorHistoria(RepositorioHistorias repositorioHistorias, RepositorioPacientes repositorioPacientes){
        this.servicioDeArchivos = new ImplementacionDelServicioDeArchivos();
        servicioDeArchivos.init("Historias");

        this.repositorioHistorias = repositorioHistorias;
        this.repositorioPacientes = repositorioPacientes;
    }

//            List<Historia> archivos = servicioDeArchivos.cargarTodo().map(archivo -> {
//                String nombreDeArchivo = archivo.getFileName().toString();
//                System.out.println(nombreDeArchivo);
//
//                String url = MvcUriComponentsBuilder.fromMethodName(ControladorHistoria.class, "obtenerArchivoHistoria", archivo.getFileName().toString()).build().toString();
//
//                Historia historia = new Historia();
//                historia.setDocumentoHistoria(url);
//
//
//                return historia;
//            }).collect(Collectors.toList());

    @GetMapping()
    public ResponseEntity<List<Historia>> obtenerHistorias(){
        try {
            List<Historia> archivos = new ArrayList<Historia>(repositorioHistorias.findAll());
            return new ResponseEntity<>(archivos, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/id")
    ResponseEntity<Historia> buscaPorIdPaciente(@RequestParam Integer idPaciente){
        try {
            Optional<Historia> historia = repositorioHistorias.findHistoriaByIdPaciente(idPaciente);

            if(historia.isPresent()){
                return new ResponseEntity<>(historia.get(), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/{archivoBuscado:.+}", produces = MediaType.MULTIPART_MIXED_VALUE)
    @ResponseBody
    public ResponseEntity<Resource> obtenerArchivoHistoria(@PathVariable String archivoBuscado) {
        try {
            Resource archivoGuardado = servicioDeArchivos.cargar(archivoBuscado);
            return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; archivo=\"" + archivoGuardado.getFilename() + "\"").body(archivoGuardado);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


//    @GetMapping("/id")
//    ResponseEntity<Historia> buscaPorIdHistoria(@RequestParam Integer idHistoria){
//        try {
//            Optional<Historia> historia = repositorioHistorias.findById(idHistoria);
//
//            if(historia.isPresent()){
//                return new ResponseEntity<>(historia.get(), HttpStatus.OK);
//            }else{
//                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
//            }
//        }catch (Exception e){
//            e.printStackTrace();
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @PostMapping()
    @Transactional
    public ResponseEntity<Historia> guardarHistoria(@RequestParam(required = true) int idPaciente, @RequestBody MultipartFile archivo) {
        try {
            Paciente paciente = repositorioPacientes.findById(idPaciente).orElseThrow(() -> new Exception("Paciente no hallado"));

            Documento historia = new Documento(archivo, archivo.getOriginalFilename());
            historia.ajustaNombreParaGuardar();

            Historia historiaACrear = new Historia();
            historiaACrear.setPaciente(paciente);
            historiaACrear.setNombreDocumentoHistoria(historia.getNombre());

            String url = this.guardarHistoria(historia);
            historiaACrear.setUrlDocumentoHistoria(url);

            Historia historiaCreada = repositorioHistorias.save(historiaACrear);

            return new ResponseEntity<>(historiaCreada ,HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("No se pudo guardar el archivo: " + archivo.getOriginalFilename() + ". Error: " + e.getMessage());
            return new ResponseEntity<>(null ,HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PutMapping()
    @Transactional
    public ResponseEntity<Historia> historiaModificada(@RequestParam int idHistoria, @RequestBody MultipartFile archivo){
        try{
            Historia historiaEditada = repositorioHistorias.findById(idHistoria).orElseThrow(() -> new Exception("Historia no hallada"));

            Documento nuevoDocumento = new Documento(archivo, archivo.getOriginalFilename());
            nuevoDocumento.ajustaNombreParaGuardar();

//            try{
                servicioDeArchivos.borrar(historiaEditada.getNombreDocumentoHistoria());
//            }catch (Exception e){
//                e.printStackTrace();
//            }

            String url = this.guardarHistoria(nuevoDocumento);

            if(!historiaEditada.getUrlDocumentoHistoria().equals(url)){
                historiaEditada.setUrlDocumentoHistoria(url);
                historiaEditada.setNombreDocumentoHistoria(nuevoDocumento.getNombre());
            }

            historiaEditada = repositorioHistorias.save(historiaEditada);
            return new ResponseEntity<>(historiaEditada ,HttpStatus.CREATED);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("No se pudo guardar el archivo: " + archivo.getOriginalFilename() + ". Error: " + e.getMessage());
            return new ResponseEntity<>(null ,HttpStatus.EXPECTATION_FAILED);
        }
    }

    @DeleteMapping
    @Transactional
    public ResponseEntity<String> borrarHistoria(@RequestParam int idHistoria){
        try {
            Historia historiaABorrar = repositorioHistorias.findById(idHistoria).orElseThrow();

            String nombreDelDocumento = historiaABorrar.getNombreDocumentoHistoria();
            if(servicioDeArchivos.borrar(nombreDelDocumento)){
                repositorioHistorias.deleteByIdHistoria(idHistoria);
                return new ResponseEntity<>("Documento borrado exitosamente.", HttpStatus.OK);
            }else{
                repositorioHistorias.deleteByIdHistoria(idHistoria);
                return new ResponseEntity<>("Historia borrada con errores.", HttpStatus.OK);
            }
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("No se pudo borrar el archivo. Error: " + e.getMessage());
            return new ResponseEntity<>(null ,HttpStatus.EXPECTATION_FAILED);
        }
    }

    private String guardarHistoria(Documento archivo){
        try {
            return servicioDeArchivos.guardar(archivo, ControladorHistoria.class, "obtenerArchivoHistoria");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
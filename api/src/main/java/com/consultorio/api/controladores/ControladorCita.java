package com.consultorio.api.controladores;

import com.consultorio.api.modelos.Cita;
import com.consultorio.api.modelos.Estudio;
import com.consultorio.api.modelos.Paciente;
import com.consultorio.api.repositorios.RepositorioCitas;
import com.consultorio.api.repositorios.RepositorioEstudios;
import com.consultorio.api.repositorios.RepositorioPacientes;
import com.consultorio.api.repositorios.RepositorioTiposDeEstudio;
import com.consultorio.api.servicio.ImplementacionDelServicioDeArchivos;
import com.consultorio.api.servicio.ServicioDeArchivos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.time.LocalDate;
import java.util.List;

@Controller
@RestController
@RequestMapping(value = "/api/citas", produces = MediaType.APPLICATION_JSON_VALUE)
public class ControladorCita {
    private final ServicioDeArchivos servicioDeArchivos;
    private final RepositorioCitas repositorioCitas;
    private final RepositorioPacientes repositorioPacientes;
    private final RepositorioEstudios repositorioEstudios;
    private final RepositorioTiposDeEstudio repositorioTiposDeEstudio;

    @Autowired
    public ControladorCita(RepositorioTiposDeEstudio repositorioTiposDeEstudio, RepositorioCitas repositorioCitas, RepositorioPacientes repositorioPacientes, RepositorioEstudios repositorioEstudios) {
        this.servicioDeArchivos = new ImplementacionDelServicioDeArchivos();
        servicioDeArchivos.init("Estudios");

        this.repositorioCitas = repositorioCitas;
        this.repositorioPacientes = repositorioPacientes;
        this.repositorioEstudios = repositorioEstudios;
        this.repositorioTiposDeEstudio = repositorioTiposDeEstudio;
    }

    @GetMapping()
    ResponseEntity<List<Cita>> buscaTodo (){
        try {
            return new ResponseEntity<>(repositorioCitas.findAll(), HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/id")
    ResponseEntity<List<Cita>> buscaPorIdPaciente(@RequestParam Integer idPaciente){
        try {
            List<Cita> citas = repositorioCitas.findCitasByIdPaciente(idPaciente).orElseThrow();
            return new ResponseEntity<>(citas, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/{archivoBuscado:.+}", produces = MediaType.MULTIPART_MIXED_VALUE)
    @ResponseBody
    public ResponseEntity<Resource> obtenerArchivoEstudio(@PathVariable String archivoBuscado) {
        try {
            Resource archivoGuardado = servicioDeArchivos.cargar(archivoBuscado);
            return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; archivo=\"" + archivoGuardado.getFilename().replaceAll("\\s+", "_") + "\"").body(archivoGuardado);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping()
//    @Transactional
    public ResponseEntity<Cita> guardarCita(@RequestParam Integer idPaciente, @RequestParam Integer tipoDeEstudio, @RequestBody MultipartFile archivoEstudio){
        try {
            Paciente paciente = repositorioPacientes.findById(idPaciente).orElseThrow(() -> new Exception("Paciente no hallado"));

            Cita citaACrear = new Cita();
            citaACrear.setPaciente(paciente);

            LocalDate fecha = LocalDate.now();
            citaACrear.setFechaCita(fecha);

            Cita citaCreada = repositorioCitas.save(citaACrear);

            if(!archivoEstudio.isEmpty()){
                String url = guardarEstudio(archivoEstudio);

                Estudio nuevoEstudio = new Estudio();

                nuevoEstudio.setCita(citaCreada);
                nuevoEstudio.setNotasEstudio(url);
                nuevoEstudio.setTipoDeEstudio(repositorioTiposDeEstudio.findById(tipoDeEstudio).orElseThrow());

                repositorioEstudios.save(nuevoEstudio);
            }

            return new ResponseEntity<>(citaCreada, HttpStatus.CREATED);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("No se pudo crear la cita. Error: " + e.getMessage());
            return new ResponseEntity<>(null ,HttpStatus.EXPECTATION_FAILED);
        }
    }

    private String guardarEstudio(MultipartFile archivo){
        try {
            servicioDeArchivos.guardar(archivo);

            String nuevoNombre = archivo.getOriginalFilename().replaceAll("\\s+", "_");
            return MvcUriComponentsBuilder.fromMethodName(ControladorCita.class, "obtenerArchivoEstudio", nuevoNombre).build().toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}

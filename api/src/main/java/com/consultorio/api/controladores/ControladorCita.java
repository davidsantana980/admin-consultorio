package com.consultorio.api.controladores;

import com.consultorio.api.modelos.Cita;
import com.consultorio.api.modelos.Documento;
import com.consultorio.api.modelos.Estudio;
import com.consultorio.api.modelos.Paciente;
import com.consultorio.api.repositorios.RepositorioCitas;
import com.consultorio.api.repositorios.RepositorioEstudios;
import com.consultorio.api.repositorios.RepositorioPacientes;
import com.consultorio.api.repositorios.RepositorioTiposDeEstudio;
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

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
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


    @GetMapping(value = "/id", params = "idPaciente")
    ResponseEntity<List<Cita>> buscaPorIdPaciente(@RequestParam Integer idPaciente){
        try {
            List<Cita> citas = repositorioCitas.findCitasByIdPaciente(idPaciente).orElseThrow();
            return new ResponseEntity<>(citas, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/id", params = "idCita")
    ResponseEntity<Cita> buscaPorIdCita(@RequestParam Integer idCita){
        try {
            Cita cita = repositorioCitas.findById(idCita).orElseThrow();
            return new ResponseEntity<>(cita, HttpStatus.OK);
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
            return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; archivo=\"" + archivoGuardado.getFilename() + "\"").body(archivoGuardado);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping()
//    @Transactional
    public ResponseEntity<Cita> guardarCita(@RequestParam Integer idPaciente, @ModelAttribute EstudioAux estudioAux){
        try {
            Paciente paciente = repositorioPacientes.findById(idPaciente).orElseThrow(() -> new Exception("Paciente no hallado"));

            Cita citaACrear = new Cita();
            citaACrear.setPaciente(paciente);

            LocalDate fecha = LocalDate.now();
            citaACrear.setFechaCita(fecha);

            Cita citaCreada = repositorioCitas.save(citaACrear);

            List<Estudio> nuevoEstudioLista = new ArrayList<>();

            if(estudioAux != null && estudioAux.existe()){
                Estudio nuevoEstudio = new Estudio();

                nuevoEstudio.setIdTipoEstudio(estudioAux.getTipoDeEstudio());
                nuevoEstudio.setArchivoEstudio(estudioAux.getArchivoEstudio());

                nuevoEstudioLista.add(guardarEstudio(nuevoEstudio, citaCreada));
            };

            citaCreada.setEstudios(nuevoEstudioLista);

            return new ResponseEntity<>(citaCreada, HttpStatus.CREATED);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("No se pudo crear la cita. Error: " + e.getMessage());
            return new ResponseEntity<>(null ,HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PostMapping("/estudios")
    @Transactional
    public ResponseEntity<Cita> agregaEstudio(@RequestParam int idCita, @ModelAttribute EstudioAux estudioAux){
        try {
            Cita cita = repositorioCitas.findById(idCita).orElseThrow(() -> new Exception("Cita no hallada"));

            if(estudioAux != null && estudioAux.existe()) {
                Estudio nuevoEstudio = new Estudio();

                nuevoEstudio.setIdTipoEstudio(estudioAux.getTipoDeEstudio());
                nuevoEstudio.setArchivoEstudio(estudioAux.getArchivoEstudio());

                guardarEstudio(nuevoEstudio, cita);
            };

            Cita citaModificada = repositorioCitas.findById(idCita).orElseThrow(() -> new Exception("La cita no fue encontrada despues del intento de modificarla"));
            return new ResponseEntity<>(citaModificada, HttpStatus.CREATED);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("No se pudo agregar el estudio. Error: " + e.getMessage());
            return new ResponseEntity<>(null ,HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PutMapping("/estudios")
    @Transactional
    public ResponseEntity<Cita> editaEstudio(@RequestParam int idEstudio, @ModelAttribute EstudioAux estudioAux){
        try {
            Estudio estudio = repositorioEstudios.findById(idEstudio).orElseThrow();
            Cita cita = estudio.getCita();

            if (estudioAux.tipoDeEstudio != null && (estudioAux.tipoDeEstudio == 1 || estudioAux.tipoDeEstudio == 2)) estudio.setTipoDeEstudio(repositorioTiposDeEstudio.findById(estudioAux.getTipoDeEstudio()).get());

            if(estudioAux.archivoEstudio != null && !estudioAux.archivoEstudio.isEmpty()) {
                Documento documento = new Documento(estudioAux.getArchivoEstudio(), estudioAux.getArchivoEstudio().getOriginalFilename());
                documento.ajustaNombreParaGuardar();

                System.out.println(documento.getArchivo().getOriginalFilename() + documento.getNombre());

                servicioDeArchivos.borrar(estudio.getNombreDocumentoEstudio());
                String url = servicioDeArchivos.guardar(documento, ControladorCita.class, "obtenerArchivoEstudio");

                estudio.setNombreDocumentoEstudio(documento.getNombre());
                estudio.setUrlNotasEstudio(url);

                repositorioEstudios.save(estudio);
            };

            Cita citaModificada = repositorioCitas.findById(cita.getIdCita()).orElseThrow(() -> new Exception("La cita no fue encontrada despues del intento de modificarla"));
            return new ResponseEntity<>(citaModificada, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("No se pudo agregar el estudio. Error: " + e.getMessage());
            return new ResponseEntity<>(null ,HttpStatus.EXPECTATION_FAILED);
        }
    }

    @DeleteMapping("/estudios")
    @Transactional
    public ResponseEntity<String> borraEstudio(@RequestParam Integer idEstudio){
        try {
            Optional<Estudio> buscaEstudio = repositorioEstudios.findById(idEstudio);

            buscaEstudio.ifPresent(estudio -> {
                servicioDeArchivos.borrar(estudio.getNombreDocumentoEstudio());
                repositorioEstudios.deleteById(idEstudio);
            });

            return new ResponseEntity<>("Estudio borrado correctamente", HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("No se pudo eliminar el estudio. Error: " + e.getMessage() ,HttpStatus.EXPECTATION_FAILED);
        }
    }

    @DeleteMapping()
    @Transactional
    public ResponseEntity<String> borraCita(@RequestParam Integer idCita){
        try {
            Cita cita = repositorioCitas.findById(idCita).orElseThrow(() -> new Exception("Cita no hallada"));

            repositorioCitas.deleteById(cita.getIdCita());

            return new ResponseEntity<>("cita borrada exitosamente", HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("No se pudo eliminar la cita. Error: " + e.getMessage());
            return new ResponseEntity<>(null ,HttpStatus.EXPECTATION_FAILED);
        }
    }

    private Estudio guardarEstudio(Estudio estudio, Cita citaCreada){
        Documento documento = new Documento(estudio.getArchivoEstudio(), estudio.getArchivoEstudio().getOriginalFilename());
        documento.ajustaNombreParaGuardar();

        String url = servicioDeArchivos.guardar(documento, ControladorCita.class, "obtenerArchivoEstudio");

        Estudio nuevoEstudio = new Estudio();

        nuevoEstudio.setNombreDocumentoEstudio(documento.getNombre());
        nuevoEstudio.setCita(citaCreada);
        nuevoEstudio.setUrlNotasEstudio(url);
        nuevoEstudio.setTipoDeEstudio(repositorioTiposDeEstudio.findById(estudio.getIdTipoEstudio()).get());

        return repositorioEstudios.save(nuevoEstudio);
    }

    private class EstudioAux{
        private Integer tipoDeEstudio;
        private MultipartFile archivoEstudio;

        public EstudioAux() {
        }

        public Integer getTipoDeEstudio() {
            return tipoDeEstudio;
        }

        public void setTipoDeEstudio(Integer tipoDeEstudio) {
            this.tipoDeEstudio = tipoDeEstudio;
        }

        public MultipartFile getArchivoEstudio() {
            return archivoEstudio;
        }

        public void setArchivoEstudio(MultipartFile archivoEstudio) {
            this.archivoEstudio = archivoEstudio;
        }

        public boolean existe(){
            return this.tipoDeEstudio != null && !this.archivoEstudio.isEmpty();
        }
    }
}

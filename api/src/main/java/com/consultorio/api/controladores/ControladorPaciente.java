package com.consultorio.api.controladores;

import com.consultorio.api.modelos.Paciente;
import com.consultorio.api.repositorios.RepositorioPacientes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@Controller
@RestController
@RequestMapping(value = "/api/pacientes", produces = MediaType.APPLICATION_JSON_VALUE)
public class ControladorPaciente {
    RepositorioPacientes repositorioPacientes;

    @Autowired
    ControladorPaciente(RepositorioPacientes repositorioPacientes){
        this.repositorioPacientes = repositorioPacientes;
    }

    @GetMapping(path = "/busca-todo")
    public ResponseEntity<List<Paciente>> buscaTodos(){
        try {
            List<Paciente> pacientes = new ArrayList<>(repositorioPacientes.findAll());

            if(pacientes.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(pacientes, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(params = {"nombrePaciente", "apellidoPaciente"})
    public ResponseEntity<List<Paciente>> busquedaRefinada(@RequestParam(required = false) String nombrePaciente, @RequestParam(required = false) String apellidoPaciente){
        try {
            if(nombrePaciente != null || apellidoPaciente != null){
                String nombreQuery= (nombrePaciente == null || nombrePaciente.isBlank() || nombrePaciente.isEmpty()) ? "" : nombrePaciente;
                String apellidoQuery= (apellidoPaciente == null || apellidoPaciente.isBlank() || apellidoPaciente.isEmpty()) ? "" : apellidoPaciente;

                System.out.println(nombrePaciente + " " + apellidoPaciente);
                System.out.println(nombreQuery + " " + apellidoQuery);

                List<Paciente> pacientes = new ArrayList<>();
                pacientes.addAll(repositorioPacientes.findPacientesByNombrePacienteContainsIgnoreCaseOrApellidoPacienteContainingIgnoreCase(nombreQuery, apellidoQuery).stream().collect(Collectors.toList()));


                if(!pacientes.isEmpty()){
                    return new ResponseEntity<>(pacientes.stream().distinct().collect(Collectors.toList()), HttpStatus.OK);
                }
            }

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/id")
    ResponseEntity<Paciente> buscaPorId(@RequestParam Integer idPaciente){
        try {
            Optional<Paciente> paciente = repositorioPacientes.findById(idPaciente);

            if(paciente.isPresent()){
                return new ResponseEntity<>(paciente.get(), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public ResponseEntity<Paciente> addPaciente(@RequestBody Paciente pacienteNuevo){
        try {
            String telefono = StringUtils.hasLength(pacienteNuevo.getTelefonoPaciente()) ? pacienteNuevo.getTelefonoPaciente() : "";

            Paciente paciente = repositorioPacientes.save((new Paciente(
                    pacienteNuevo.getNombrePaciente(),
                    pacienteNuevo.getApellidoPaciente(),
                    pacienteNuevo.getCedulaPaciente(),
                    telefono
                )
            ));

            return new ResponseEntity<>(paciente, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping()
    ResponseEntity<Paciente> modifica(@RequestParam(required = true) Integer idPaciente, @ModelAttribute Paciente pacienteAModificar){
        try{
            Optional<Paciente> pacienteEnBD = repositorioPacientes.findById(idPaciente);

            if(pacienteEnBD.isPresent()){
                Paciente pacienteFinal = pacienteEnBD.get();

                if(StringUtils.hasLength(pacienteAModificar.getNombrePaciente())) pacienteFinal.setNombrePaciente(pacienteAModificar.getNombrePaciente());
                if(StringUtils.hasLength(pacienteAModificar.getApellidoPaciente())) pacienteFinal.setApellidoPaciente(pacienteAModificar.getApellidoPaciente());
                if(StringUtils.hasLength(pacienteAModificar.getCedulaPaciente())) pacienteFinal.setCedulaPaciente(pacienteAModificar.getCedulaPaciente());
                if(StringUtils.hasLength(pacienteAModificar.getTelefonoPaciente())) pacienteFinal.setTelefonoPaciente(pacienteAModificar.getTelefonoPaciente());

                return new ResponseEntity<>(repositorioPacientes.save(pacienteFinal), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping()
    ResponseEntity<Paciente> eliminaPaciente(@RequestParam(required = true) Integer idPaciente){
        try {
            Optional<Paciente> ultimaCopia = repositorioPacientes.findById(idPaciente);

            if(ultimaCopia.isPresent()){
                repositorioPacientes.deleteById(idPaciente);
                return new ResponseEntity<>(null, HttpStatus.OK);
            }else{
                throw new Exception("Paciente no encontrado");
            }
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

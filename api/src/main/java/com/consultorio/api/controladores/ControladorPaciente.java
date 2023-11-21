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

    @GetMapping()
    public ResponseEntity<List<Paciente>> busca(@RequestParam(required = false) String nombrePaciente){
        try {

            List<Paciente> pacientes = new ArrayList<>((nombrePaciente == null || nombrePaciente.isBlank()) ? repositorioPacientes.findAll() : repositorioPacientes.findPacienteByNombrePaciente(nombrePaciente));

            if(pacientes.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(pacientes, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/id")
    ResponseEntity<Paciente> buscaPorId(@RequestParam Integer idPaciente){
        try {
            Optional<Paciente> paciente = repositorioPacientes.pacienteConHistoria(idPaciente);

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
                return new ResponseEntity<>(ultimaCopia.get(), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

package com.consultorio.api.controladores;

import com.consultorio.api.modelos.Cita;
import com.consultorio.api.modelos.Paciente;
import com.consultorio.api.repositorios.RepositorioCitas;
import com.consultorio.api.repositorios.RepositorioPacientes;
import com.consultorio.api.servicio.ServicioDeArchivos;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Controller
@RestController
@RequestMapping(value = "/api/citas", produces = MediaType.APPLICATION_JSON_VALUE)
public class ControladorCita {
    private final ServicioDeArchivos servicioDeArchivos;
    private final RepositorioCitas repositorioCitas;
    private final RepositorioPacientes repositorioPacientes;

    @Autowired
    public ControladorCita(ServicioDeArchivos servicioDeArchivos, RepositorioCitas repositorioCitas, RepositorioPacientes repositorioPacientes) {
        this.servicioDeArchivos = servicioDeArchivos;
        this.repositorioCitas = repositorioCitas;
        this.repositorioPacientes = repositorioPacientes;
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

    @PostMapping()
    @Transactional
    public ResponseEntity<Cita> guardarCita(@RequestParam Integer idPaciente){
        try {
            Paciente paciente = repositorioPacientes.findById(idPaciente).orElseThrow(() -> new Exception("Paciente no hallado"));

            Cita citaACrear = new Cita();
            citaACrear.setPaciente(paciente);

            //guardar estudio si se hizo

            Date fecha = new Date();
            citaACrear.setFechaCita(new java.sql.Date(fecha.getTime()));

            Cita citaCreada = repositorioCitas.save(citaACrear);

            return new ResponseEntity<>(citaCreada, HttpStatus.CREATED);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("No se pudo crear la cita. Error: " + e.getMessage());
            return new ResponseEntity<>(null ,HttpStatus.EXPECTATION_FAILED);
        }
    }
}

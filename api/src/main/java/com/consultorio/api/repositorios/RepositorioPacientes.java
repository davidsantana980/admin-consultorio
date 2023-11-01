package com.consultorio.api.repositorios;

import com.consultorio.api.modelos.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepositorioPacientes extends JpaRepository<Paciente, Integer> {
    List<Paciente> findPacienteByNombrePaciente(String nombre_paciente);
    //    List<Paciente> findPacienteByApellido_paciente(String nombre);
}

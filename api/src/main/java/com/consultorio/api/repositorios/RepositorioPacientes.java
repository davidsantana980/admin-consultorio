package com.consultorio.api.repositorios;

import com.consultorio.api.modelos.Paciente;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RepositorioPacientes extends JpaRepository<Paciente, Integer> {
    List<Paciente> findPacientesByNombrePacienteContainsIgnoreCaseOrApellidoPacienteContainingIgnoreCase(String nombre, String apellido);
}

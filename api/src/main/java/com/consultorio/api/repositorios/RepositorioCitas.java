package com.consultorio.api.repositorios;

import com.consultorio.api.modelos.Cita;
import com.consultorio.api.modelos.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RepositorioCitas extends JpaRepository<Cita, Integer> {
    Optional<List<Cita>> findCitasByIdPaciente(int idPaciente);
    Optional<List<Cita>> findCitasByPaciente(Paciente paciente);

}

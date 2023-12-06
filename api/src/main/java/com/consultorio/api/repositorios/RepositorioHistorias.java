package com.consultorio.api.repositorios;

import com.consultorio.api.modelos.Historia;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepositorioHistorias extends JpaRepository<Historia, Integer> {
    @Transactional
    void deleteByIdHistoria(int idHistoria);

    @Transactional
    void deleteByPacienteIdPaciente(int idPaciente);

    Optional<Historia> findHistoriaByIdPaciente(int idPaciente);
}

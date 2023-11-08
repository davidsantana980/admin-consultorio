package com.consultorio.api.repositorios;

import com.consultorio.api.modelos.Estudio;
import com.consultorio.api.modelos.TipoDeEstudio;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositorioEstudios extends JpaRepository<Estudio, Integer>{
    public void deleteAllByIdCita(Integer idCita);
}



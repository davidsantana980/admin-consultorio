package com.consultorio.api.repositorios;

import com.consultorio.api.modelos.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RepositorioUsuarios extends JpaRepository<Usuario, Integer> {
    Boolean existsUsuarioByNombre(String nombre);
    Optional<Usuario> findUsuarioByNombre(String nombre);
}

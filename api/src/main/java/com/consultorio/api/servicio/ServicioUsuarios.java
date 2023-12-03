package com.consultorio.api.servicio;

import com.consultorio.api.modelos.Usuario;

import java.util.Optional;

public interface ServicioUsuarios {

    Integer saveUser(Usuario user);

    Optional<Usuario> findByUsername(String username);

}

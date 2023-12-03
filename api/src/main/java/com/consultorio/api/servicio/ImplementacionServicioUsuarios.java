package com.consultorio.api.servicio;

import com.consultorio.api.modelos.Usuario;
import com.consultorio.api.repositorios.RepositorioUsuarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.beans.Encoder;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class ImplementacionServicioUsuarios implements  ServicioUsuarios, UserDetailsService {
    private final RepositorioUsuarios repositorioUsuarios;
    private final BCryptPasswordEncoder encoder;

    @Autowired
    public ImplementacionServicioUsuarios(RepositorioUsuarios repositorioUsuarios, BCryptPasswordEncoder encoder) {
        this.repositorioUsuarios = repositorioUsuarios;
        this.encoder = encoder;
    }

    @Override
    public Integer saveUser(Usuario user) {
        user.setPass(encoder.encode(user.getPass()));
        return repositorioUsuarios.save(user).getId();
    }

    @Override
    public Optional<Usuario> findByUsername(String username) {
        return repositorioUsuarios.findUsuarioByNombre(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Usuario> opt = repositorioUsuarios.findUsuarioByNombre(username);

        User springUser=null;

        if(opt.isEmpty()) {
            throw new UsernameNotFoundException("Usuario " +username +" no encontrado");
        }else {
            Usuario user =opt.get();	//retrieving user from DB

            user.setRoles(List.of("ROLE_TODO"));

            List<String> roles = user.getRoles();

            List<GrantedAuthority> ga = new ArrayList<>();

            for(String role:roles) {
                ga.add(new SimpleGrantedAuthority(role));
            }

            springUser = new org.springframework.security.core.userdetails.User(
                    username,
                    user.getPass(),
                    ga
            );
        }

        return springUser;
    }


}

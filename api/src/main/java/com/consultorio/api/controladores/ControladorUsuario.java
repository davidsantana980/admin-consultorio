package com.consultorio.api.controladores;

import java.util.Collections;
import java.util.Map;

import com.consultorio.api.jwt.JWTUtil;
import com.consultorio.api.modelos.Usuario;
import com.consultorio.api.servicio.ServicioUsuarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api/usuarios", produces = MediaType.APPLICATION_JSON_VALUE)
@ResponseBody
public class ControladorUsuario {

    private final ServicioUsuarios userService;
    private final JWTUtil util;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public ControladorUsuario(ServicioUsuarios userService, JWTUtil util, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.util = util;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/crear")
    public ResponseEntity<String> crearUsuario(@RequestBody UsuarioRequest usuario) {
        Usuario usuarioACrear = new Usuario(usuario.getUsername(), usuario.getPassword());
        try {
            Integer id = userService.saveUser(usuarioACrear);
            String message = "Usuario id '" + id + "' guardado exitosamente";
            //return new ResponseEntity<String>(message, HttpStatus.OK);
            return ResponseEntity.ok(message);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
            return ResponseEntity.status(500).body("error guardando el usuario");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody UsuarioRequest request){

        //Validate username/password with DB(required in case of Stateless Authentication)
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            String token = util.generateToken(request.getUsername());
            return ResponseEntity.ok(Collections.singletonMap("token", token));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).body(Collections.singletonMap("error", "fallo en el inicio de sesion"));
        }
    }
}

class UsuarioRequest {
    private String username;
    private String password;

    public UsuarioRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public UsuarioRequest() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}


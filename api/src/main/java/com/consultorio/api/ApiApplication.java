package com.consultorio.api;

import com.consultorio.api.servicio.ServicioDeArchivos;
import jakarta.annotation.Resource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

//@Controller
@SpringBootApplication//(scanBasePackageClasses = {"com.consulti"})
@EnableMethodSecurity
public class ApiApplication implements ErrorController {
	@Resource
	ServicioDeArchivos servicioDeArchivos;

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}
//
//
//	private static final String PATH = "/error";
//
//	@RequestMapping(value = PATH)
//	public String error() {
//		return "forward:/index.html";
//	}
//
//	public String getErrorPath() {
//		return PATH;
//	}
}


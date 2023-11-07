package com.consultorio.api;

import com.consultorio.api.servicio.ServicioDeArchivos;
import jakarta.annotation.Resource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiApplication {

	@Resource
	ServicioDeArchivos servicioDeArchivos;

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

//	public void run(String... arg) throws Exception {
////    storageService.deleteAll();
//		servicioDeArchivos.init();
//	}

}

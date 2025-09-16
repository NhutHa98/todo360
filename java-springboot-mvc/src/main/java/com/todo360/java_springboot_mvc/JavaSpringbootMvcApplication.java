package com.todo360.java_springboot_mvc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class JavaSpringbootMvcApplication {

	public static void main(String[] args) {
		SpringApplication.run(JavaSpringbootMvcApplication.class, args);
	}

}

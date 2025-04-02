package com.example.logis_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@ServletComponentScan
@SpringBootApplication
public class LogisAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(LogisAppApplication.class, args);
	}

}

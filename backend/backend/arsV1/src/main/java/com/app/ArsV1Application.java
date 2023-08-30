package com.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//@EnableSwagger2
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class ArsV1Application {

	public static void main(String[] args) {
		SpringApplication.run(ArsV1Application.class, args);
	}

	@Bean
	public WebMvcConfigurer configure() {
		return new WebMvcConfigurer() {
			public void addCorsMappings(CorsRegistry reg) {
				reg.addMapping("/*").allowedOrigins("*");
			}
		};
	}
}

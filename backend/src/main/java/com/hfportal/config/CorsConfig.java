package com.hfportal.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Allow access to all endpoints
                .allowedOrigins("http://localhost:3001")  // Allow this origin (can be changed to your frontend URL)
                .allowedMethods("*")  // Allow all HTTP methods
                .allowCredentials(true)  // Allow sending cookies and HTTP authentication
                .allowedHeaders("*")  // Allow all headers
                .maxAge(3600);  // Maximum age for the preflight request cache
    }
}

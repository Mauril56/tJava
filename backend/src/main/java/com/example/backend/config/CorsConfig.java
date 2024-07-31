package com.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Définir le mapping de l'API
                .allowedOrigins("http://localhost:3002") // Autoriser l'origine spécifique de votre application
                                                         // React
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Autoriser les méthodes HTTP nécessaires
                .allowedHeaders("*"); // Autoriser tous les en-têtes
    }
}

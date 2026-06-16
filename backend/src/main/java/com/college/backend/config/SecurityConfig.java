package com.college.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import com.college.backend.filters.JWTFilter;
import com.college.backend.services.MyUserDetailsService;

import java.util.List;


@Configuration
@EnableWebSecurity
@Profile("!test")
public class SecurityConfig {

    private final MyUserDetailsService userDetailsService; 
    private final JWTFilter jwtFilter;

    SecurityConfig(JWTFilter filter, MyUserDetailsService service){
        this.jwtFilter = filter;
        this.userDetailsService = service;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http){
        return http
                .cors(Customizer.withDefaults()) // Enables CORS integration
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(request -> 
                    request.requestMatchers(
                        "/api/hello",
                        "/api/register", 
                        "/api/login"
                    )
                    .permitAll()
                    .anyRequest()
                    .authenticated()
                )
                .httpBasic(Customizer.withDefaults())
                .sessionManagement(sess -> 
                    sess.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS
                    )
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config){
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();

        // Specify frontend origin
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));

        // Allow OPTIONS for preflight requests
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Allow headers including bearer token
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));

        // To use cookies or auth headers across domains
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        // Apply configuration to all API endpoints
        source.registerCorsConfiguration("/api/**", configuration);

        return source;
    }
}


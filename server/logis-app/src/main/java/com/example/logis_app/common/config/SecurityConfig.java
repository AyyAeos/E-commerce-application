package com.example.logis_app.common.config;

import com.example.logis_app.filter.JwtAuthenticationTokenFIlter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
     JwtAuthenticationTokenFIlter jwtAuthenticationTokenFIlter;

    // Password Encoder Bean for BCrypt
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    // Security Filter Chain to configure HTTP security
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Disable CSRF for stateless APIs (e.g., when using JWT)
                .csrf(csrf -> csrf.disable())
                // not letting session to retrieve security context
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // No session management
                )
                // Define which requests need authentication
                .authorizeHttpRequests(auth -> auth
                        // Allow anonymous access to login endpoint
                        .requestMatchers("/logins").permitAll()
                        // Require authentication for any other request
                        .anyRequest().authenticated()
                )
                // Add custom JWT filter before Spring Security's UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtAuthenticationTokenFIlter , UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

}

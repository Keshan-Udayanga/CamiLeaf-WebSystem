package com.example.demo.Config;

import com.example.demo.Service.UserManagement.CustomUserService;
import com.example.demo.Utility.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CustomUserService customUserService;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults()) // <- this enables CORS using your CorsGlobalConfig
                .csrf(csrf -> csrf.disable()) // disable CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/v1/product/getAll").permitAll()
                        .requestMatchers("/api/v1/user/me").permitAll()
                        .requestMatchers("/api/v1/order/add").hasRole("CUSTOMER")
                        .requestMatchers("/api/v1/user/edit/**").hasRole("CUSTOMER")
                        .requestMatchers("/api/v1/user/change-password/**").hasRole("CUSTOMER")
                        .requestMatchers("/api/v1/user/**").hasRole("ADMIN")
                        .requestMatchers("/api/v1/product/**").hasRole("ADMIN")
                        .requestMatchers("/api/v1/order/**").hasRole("ADMIN")
                        .requestMatchers("/api/v1/resource/**").hasAnyRole("ADMIN", "RESOURCE MANAGER")
                        .requestMatchers("/api/v1/leafIntake/**").hasAnyRole("ADMIN", "LEAF CLERK")
                        .requestMatchers("/api/v1/suppliers/**").hasAnyRole("ADMIN", "LEAF CLERK")
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );


        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}

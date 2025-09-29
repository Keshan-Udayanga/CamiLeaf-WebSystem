package com.example.demo.Service.UserManagement;

import com.example.demo.Entity.UserManagement.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserService implements UserDetailsService {

    private final UserServices userServices;

    @Autowired
    public CustomUserService(UserServices userServices){
        this.userServices = userServices;
    }


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userServices.getUsers()
                .iterator()
                .next();

        user = userServices.getUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not Found"));

        GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + user.getRole().toUpperCase());
        
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                List.of(authority)
        );
    }


}

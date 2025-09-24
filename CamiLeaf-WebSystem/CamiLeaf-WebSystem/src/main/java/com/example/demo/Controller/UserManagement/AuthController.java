package com.example.demo.Controller.UserManagement;

import com.example.demo.DTO.LoginRequest;
import com.example.demo.DTO.SignUpRequest;
import com.example.demo.Entity.UserManagement.Customer;
import com.example.demo.Entity.UserManagement.User;
import com.example.demo.Service.UserManagement.UserServices;
import com.example.demo.Utility.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserServices userServices;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest ){
        Map<String, Object> response = new HashMap<>();
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            User user = userServices.getUserByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

            response.put("success", true);
            response.put("email", user.getEmail());
            response.put("role", user.getRole().toUpperCase());
            response.put("token", token);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signupCustomer(@RequestBody SignUpRequest request){
        try{
            Customer customer = new Customer();
            customer.setEmail(request.getEmail());
            customer.setPassword(request.getPassword());
            customer.setFirstName(request.getFirstName());
            customer.setLastName(request.getLastName());
            customer.setPhoneNumber(request.getPhone());
            customer.setAddress(request.getAddress());
            customer.setCountry(request.getCountry());
            customer.setRole("Customer");
            customer.setStatus("Active");


            User newUser = userServices.signupCustomer(customer);

            return ResponseEntity.ok().body(newUser);
        }catch (RuntimeException e) {

            Map<String, String> errorBody = new HashMap<>();
            errorBody.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorBody);
        }

    }
}

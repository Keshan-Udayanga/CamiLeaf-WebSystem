package com.example.demo.Controller.UserManagement;

import com.example.demo.Entity.UserManagement.User;
import com.example.demo.Service.UserManagement.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    private UserServices userServices;

    @PostMapping(value = "/save")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            User savedUser = userServices.createUser(user);

            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("id", savedUser.getId());
            responseBody.put("message", "User created successfully");

            return ResponseEntity.ok(responseBody);

        } catch (RuntimeException e) {

            Map<String, String> errorBody = new HashMap<>();
            errorBody.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorBody);
        }
    }


    @GetMapping(value = "/getAll")
    public Iterable<User> getAllUsers(){
        return userServices.getUsers();
    }

    @PutMapping(value = "/edit/{id}")
    public User updateUser(@RequestBody User user, @PathVariable (name = "id")String id){
        return userServices.updateUser(id, user);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable (name = "id")String id){
        userServices.deleteUser(id);
    }

    @RequestMapping("/{id}")
    public User getUser(@PathVariable (name = "id")String id){
        return userServices.getUserById(id);
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(Authentication authentication){
        String email = authentication.getName();
        User user = userServices.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/change-password/{id}")
    public ResponseEntity<?> changePassword(@PathVariable String id, @RequestBody Map<String, String> body) {
        try {
            userServices.changePassword(id, body.get("oldPass"), body.get("newPass"));
            return ResponseEntity.ok("Password updated");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}

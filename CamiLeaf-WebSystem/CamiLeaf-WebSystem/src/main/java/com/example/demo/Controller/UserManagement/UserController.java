package com.example.demo.Controller.UserManagement;

import com.example.demo.Entity.UserManagement.User;
import com.example.demo.Service.UserManagement.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/v1/user")
public class UserController {

    @Autowired
    private UserServices userServices;

    @PostMapping(value = "/save")
    public String createUser(@RequestBody User users){
        userServices.createUser(users);
        return users.getId();
    }

    @GetMapping(value = "/getAll")
    public Iterable<User> getAllUsers(){

        return userServices.getUsers();
    }
}

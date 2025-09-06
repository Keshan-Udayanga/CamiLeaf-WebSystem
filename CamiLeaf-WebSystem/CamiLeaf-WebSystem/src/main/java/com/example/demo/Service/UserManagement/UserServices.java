package com.example.demo.Service.UserManagement;

import com.example.demo.Entity.UserManagement.User;
import com.example.demo.Repo.UserManagement.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserServices {

    @Autowired
    private UserRepository userRepo;


    public void createUser(User users) {
        Date now = new Date();
        users.setCreatedAt(now);
        users.setLastLogin(null);
        userRepo.save(users);
    }

    public Iterable<User> getUsers() {
        return this.userRepo.findAll();
    }

    public User updateUser(String id, User users) {

        return userRepo.findById(id).map(user -> {
            user.setFirstName(users.getFirstName());
            user.setLastName(users.getLastName());
            user.setEmail(users.getEmail());
            user.setPhoneNumber(users.getPhoneNumber());
            user.setAddress(users.getAddress());
            user.setRole(users.getRole());
            user.setStatus(users.getStatus());
            return userRepo.save(user);
        }).orElse(null);
    }

    public void deleteUser(String id) {
        userRepo.deleteById(id);
    }

    public User getUserById(String id) {
        return userRepo.findById(id).get();
    }
}

package com.example.demo.Service.UserManagement;

import com.example.demo.Entity.UserManagement.User;
import com.example.demo.Repo.UserManagement.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServices {

    @Autowired
    private UserRepository userRepo;

    public void createUser(User users) {
        userRepo.save(users);
    }

    public Iterable<User> getUsers() {
        return this.userRepo.findAll();
    }
}

package com.example.demo.Repo.UserManagement;

import com.example.demo.Entity.UserManagement.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}

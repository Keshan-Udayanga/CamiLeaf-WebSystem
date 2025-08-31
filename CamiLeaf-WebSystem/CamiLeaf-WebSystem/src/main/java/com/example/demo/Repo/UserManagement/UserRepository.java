package com.example.demo.Repo.UserManagement;

import com.example.demo.Entity.UserManagement.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}

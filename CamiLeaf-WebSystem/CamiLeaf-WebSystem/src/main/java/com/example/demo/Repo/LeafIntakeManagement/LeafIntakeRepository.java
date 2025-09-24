package com.example.demo.Repo.LeafIntakeManagement;

import com.example.demo.Entity.LeafIntakeManagement.LeafIntake;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeafIntakeRepository extends MongoRepository<LeafIntake, String>{}


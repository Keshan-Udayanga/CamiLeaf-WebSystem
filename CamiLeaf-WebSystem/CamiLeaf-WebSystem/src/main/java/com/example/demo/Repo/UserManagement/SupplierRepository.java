package com.example.demo.Repo.UserManagement;

import com.example.demo.Entity.UserManagement.Supplier;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends MongoRepository<Supplier, String> {
    Supplier findTopByOrderByCreatedAtDesc(); // To generate next code
}


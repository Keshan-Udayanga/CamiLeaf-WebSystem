package com.example.demo.Repo.ProductManagement;

import com.example.demo.Entity.ResourceManagement.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {}

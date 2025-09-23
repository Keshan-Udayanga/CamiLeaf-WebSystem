package com.example.demo.Repo.OrderManagement;

import com.example.demo.Entity.OrderManagement.Order;
import com.example.demo.Entity.ResourceManagement.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {}

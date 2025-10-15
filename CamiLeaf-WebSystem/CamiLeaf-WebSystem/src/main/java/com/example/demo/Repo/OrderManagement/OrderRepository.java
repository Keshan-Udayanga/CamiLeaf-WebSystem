package com.example.demo.Repo.OrderManagement;

import com.example.demo.Entity.OrderManagement.Order;
import com.example.demo.Entity.OrderManagement.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByUserId(String userId);
}

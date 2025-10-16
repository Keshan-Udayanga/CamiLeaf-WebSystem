package com.example.demo.Service.OrderManagement;

import com.example.demo.Entity.OrderManagement.Order;
import com.example.demo.Repo.OrderManagement.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServices {

    @Autowired
    private OrderRepository orderRepository;

    public void addNewOrder(Order order){

        orderRepository.save(order);}

    //get all orders
    public List<Order> getAllOrders(){ return orderRepository.findAll();
    }

    //delete order
    public void deleteOrder(String id){orderRepository.deleteById(id);}

    //update order details
    public Order updateStatus(String id, String status) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }


    public Order getOrderById(String id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<Order> getOrdersByUser(String userId) {
        return orderRepository.findByUserId(userId);
    }

}

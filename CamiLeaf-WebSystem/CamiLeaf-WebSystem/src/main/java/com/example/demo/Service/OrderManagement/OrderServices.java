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
    public Order updateOrder(String id , Order updateOrder){
        Order existingOrder = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found with id : " + id));

        existingOrder.setFullName(updateOrder.getFullName());
        existingOrder.setAddress(updateOrder.getAddress());
        existingOrder.setCity(updateOrder.getCity());
        existingOrder.setEmail(updateOrder.getEmail());
        existingOrder.setOrdertype(updateOrder.getOrdertype());
        existingOrder.setPaymentMethod(updateOrder.getPaymentMethod());
        existingOrder.setTotal(updateOrder.getTotal());
        existingOrder.setZip(updateOrder.getZip());
        existingOrder.setStatus(updateOrder.getStatus());


        return orderRepository.save(existingOrder);
    }


}

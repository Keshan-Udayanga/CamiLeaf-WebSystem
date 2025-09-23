package com.example.demo.Controller.OrderManagement;

import com.example.demo.Entity.OrderManagement.Order;
import com.example.demo.Service.OrderManagement.OrderServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1/order")
public class OrderController {

    @Autowired
    private OrderServices orderServices;

    @PostMapping("/add")
    public String addNewOrder(@RequestBody Order order){

        orderServices.addNewOrder(order);
        return order.getId();
    }

    //get all
    @GetMapping("/getAll")
    public List<Order> getAllOrder(){return orderServices.getAllOrders();}

    //delete
    @DeleteMapping("/delete/{id}")
    public String deleteOrder(@PathVariable String id){
        orderServices.deleteOrder(id);
        return "Delete Successfully";
    }

    //get by Id
    @GetMapping("/get/{id}")
    public Order getProduct(@PathVariable String id, @RequestBody Order order){
        return orderServices.updateOrder(id , order);
    }

}

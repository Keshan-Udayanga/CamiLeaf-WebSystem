package com.example.demo.Controller.OrderManagement;

import com.example.demo.Entity.OrderManagement.Order;
import com.example.demo.Service.OrderManagement.OrderServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    //update order

    @PutMapping("/update/{id}")
    public Order updateOrderStatus(@PathVariable String id, @RequestBody Map<String, String> request) {
        String status = request.get("status");
        return orderServices.updateStatus(id, status);
    }


}

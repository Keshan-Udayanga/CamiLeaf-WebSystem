package com.example.demo.Controller.OrderManagement;

import com.example.demo.Entity.OrderManagement.Order;
import com.example.demo.Service.OrderManagement.OrderServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    @GetMapping("/report/sales-summary")
    public Map<String, Object> getSalesSummary() {
        List<Order> orders = orderServices.getAllOrders();

        // Total orders & total sales
        long totalOrders = orders.size();
        double totalSales = orders.stream()
                .mapToDouble(Order::getTotal)
                .sum();

        // Group by payment method (optional analytics)
        Map<String, Long> paymentSummary = orders.stream()
                .collect(Collectors.groupingBy(Order::getPaymentMethod, Collectors.counting()));

        // Group by status (optional)
        Map<String, Long> statusSummary = orders.stream()
                .collect(Collectors.groupingBy(Order::getStatus, Collectors.counting()));

        // Prepare summary map
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalOrders", totalOrders);
        summary.put("totalSales", totalSales);
        summary.put("paymentSummary", paymentSummary);
        summary.put("statusSummary", statusSummary);
        summary.put("orders", orders);

        return summary;
    }

    @GetMapping("/get/{id}")
    public Order getOrderById(@PathVariable String id) {
        return orderServices.getOrderById(id); // Add this method in your service layer too
    }

    @GetMapping("/orders/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable String userId) {

        List<Order> orders = orderServices.getOrdersByUser(userId);
        return ResponseEntity.ok(orders);
    }

}

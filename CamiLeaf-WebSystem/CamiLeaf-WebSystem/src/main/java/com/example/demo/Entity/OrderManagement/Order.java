package com.example.demo.Entity.OrderManagement;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Order")
public class Order {

    @Id
    private String id;
    private String Ordertype;
    private String fullName;
    private String address;
    private String city;
    private String email;
    private String paymentMethod;
    private String status;
    private int zip;
    private double total;

    public Order() {}

    public Order( String ordertype, String fullName, String address, String city, String email, String paymentMethod, int zip, String status, double total) {

        this.Ordertype = ordertype;
        this.fullName = fullName;
        this.address = address;
        this.city = city;
        this.email = email;
        this.paymentMethod = paymentMethod;
        this.zip = zip;
        this.status = status;
        this.total = total;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrdertype() {
        return Ordertype;
    }

    public void setOrdertype(String ordertype) {
        Ordertype = ordertype;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getZip() {
        return zip;
    }

    public void setZip(int zip) {
        this.zip = zip;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }
}

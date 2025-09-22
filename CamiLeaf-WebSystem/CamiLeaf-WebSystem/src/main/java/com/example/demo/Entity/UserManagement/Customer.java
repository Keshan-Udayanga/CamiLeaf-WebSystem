package com.example.demo.Entity.UserManagement;

import org.springframework.data.annotation.TypeAlias;

@TypeAlias("Customer")
public class Customer extends User {
    private String country;

    public Customer(){}

    public Customer(String email, String password, String firstName, String lastName, String phoneNumber, String address, String role, String status, String country) {
        super(email, password, firstName, lastName, phoneNumber, address, role, status);
        this.country = country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCountry() {
        return country;
    }
}

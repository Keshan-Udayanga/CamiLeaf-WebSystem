package com.example.demo.Entity.ResourceManagement;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "Product")
public class Product {

    @Id
    private String id;
    private String productImg;
    private String productName;
    private double price;
    private int stock;
    @CreatedDate
    private Date addedDate;
    private double discount;
    private String category;

    public Product() {}

    public Product(String productImg, String productName, double price, int stock, double discount,String category) {
        this.productImg = productImg;
        this.productName = productName;
        this.price = price;
        this.stock = stock;
        this.discount = discount;
        this.category = category;
    }

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getProductImg() { return productImg; }
    public void setProductImg(String productImg) { this.productImg = productImg; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }

    public double getDiscount() { return discount; }
    public void setDiscount(double discount) { this.discount = discount; }

    public Date getAddedDate() { return addedDate; }
    public void setAddedDate(Date addedDate) { this.addedDate = addedDate; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

}

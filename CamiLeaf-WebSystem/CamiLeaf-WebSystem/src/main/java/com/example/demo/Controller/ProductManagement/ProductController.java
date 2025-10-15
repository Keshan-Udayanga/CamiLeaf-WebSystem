package com.example.demo.Controller.ProductManagement;

import com.example.demo.Entity.ProductManagement.Product;
import com.example.demo.Service.ProductManagement.ProductServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/product")
public class ProductController {

    @Autowired
    private ProductServices productServices;

    @PostMapping("/add")
    public ResponseEntity<String> addNewProduct(@RequestBody Product product) {
        try {
            product.setAddedDate(new Date());
            productServices.addNewProduct(product);
            return ResponseEntity.ok(product.getId());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error adding product: " + e.getMessage());
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Product>> getAllProducts() {
        try {
            return ResponseEntity.ok(productServices.getAllProducts());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getProduct(@PathVariable String id) {
        try {
            return ResponseEntity.ok(productServices.getProductById(id));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error retrieving product");
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable String id, @RequestBody Product product) {
        try {
            return ResponseEntity.ok(productServices.updateProducts(id, product));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error updating product");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable String id) {
        try {
            productServices.deleteProduct(id);
            return ResponseEntity.ok("Deleted Successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error deleting product: " + e.getMessage());
        }
    }

    // ✅ New endpoint for product summary report
    @GetMapping("/report/summary")
    public ResponseEntity<Map<String, Object>> getProductSummary() {
        try {
            return ResponseEntity.ok(productServices.getProductSummary());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Collections.emptyMap());
        }
    }
}

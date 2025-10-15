package com.example.demo.Service.ProductManagement;

import com.example.demo.Entity.ProductManagement.Product;
import com.example.demo.Repo.ProductManagement.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductServices {

    @Autowired
    private ProductRepository productRepository;

    // Add new product
    public void addNewProduct(Product product){
        if (product.getAddedDate() == null) {
            product.setAddedDate(new Date());
        }
        productRepository.save(product);
    }

    // Get all products
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    // Get product by ID
    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
    }

    // Delete product
    public void deleteProduct(String id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with ID: " + id);
        }
        productRepository.deleteById(id);
    }

    // Update product
    public Product updateProducts(String id, Product updatedProduct) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));

        existingProduct.setProductName(updatedProduct.getProductName());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setStock(updatedProduct.getStock());
        existingProduct.setDiscount(updatedProduct.getDiscount());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setProductImg(updatedProduct.getProductImg());

        return productRepository.save(existingProduct);
    }

    // Generate Product Summary with Supplier Details
    public Map<String, Object> getProductSummary() {
        List<Product> products = productRepository.findAll();

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalProducts", products.size());
        int totalStock = products.stream().mapToInt(p -> p.getStock() != 0 ? p.getStock() : 0).sum();
        summary.put("totalStock", totalStock);

        List<Map<String, Object>> records = new ArrayList<>();
        for (Product p : products) {
            Map<String, Object> r = new HashMap<>();
            r.put("productId", p.getId());
            r.put("productName", p.getProductName());
            r.put("category", p.getCategory());
            r.put("price", p.getPrice());
            r.put("stock", p.getStock());
            r.put("discount", p.getDiscount());

            records.add(r);
        }

        summary.put("records", records);
        return summary;
    }
}

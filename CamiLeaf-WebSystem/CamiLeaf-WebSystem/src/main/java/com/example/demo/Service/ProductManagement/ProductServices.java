package com.example.demo.Service.ProductManagement;

import com.example.demo.Entity.ProductManagement.Product;
import com.example.demo.Repo.ProductManagement.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServices {

    @Autowired
    private ProductRepository productRepository;

    public void addNewProduct(Product product){
        productRepository.save(product);
    }

    //  get all products
    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    // delete product
    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    // update product details
    public Product updateProducts(String id, Product updatedProduct) {
        // Find the existing product
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        // Update the fields
        existingProduct.setProductName(updatedProduct.getProductName());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setStock(updatedProduct.getStock());
        existingProduct.setDiscount(updatedProduct.getDiscount());
        existingProduct.setCategory(updatedProduct.getCategory());
        existingProduct.setProductImg(updatedProduct.getProductImg());

        // Save the updated product
        return productRepository.save(existingProduct);
    }

    public Product getProductById(String id) {
        return productRepository.findById(id).get();
    }




}

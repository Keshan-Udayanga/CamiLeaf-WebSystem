package com.example.demo.Controller.ProductManagement;

import com.example.demo.Entity.ResourceManagement.Product;
import com.example.demo.Service.ProductManagement.ProductServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/product")
public class ProductController {

    @Autowired
    private ProductServices productServices;

    @PostMapping("/add")
    public String addNewProduct(@RequestBody Product product){
        product.setAddedDate(new Date());
        productServices.addNewProduct(product);
        return product.getId();
    }

    // get all
    @GetMapping("/getAll")
    public List<Product> getAllProducts(){
        return productServices.getAllProducts();
    }

    // delete
    @DeleteMapping("/delete/{id}")
    public String deleteProduct(@PathVariable String id) {
        productServices.deleteProduct(id);
        return "Deleted Successfully";
    }

    // get by id
    @GetMapping("/get/{id}")
    public Product getProduct(@PathVariable String id){
        return productServices.getProductById(id);
    }

    // update
    @PutMapping("/update/{id}")
    public Product updateProduct(@PathVariable String id, @RequestBody Product product) {
        return productServices.updateProducts(id, product);
    }
}

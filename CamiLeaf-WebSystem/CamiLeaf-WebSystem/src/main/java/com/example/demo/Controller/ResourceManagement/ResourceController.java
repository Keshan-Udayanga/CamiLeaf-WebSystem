package com.example.demo.Controller.ResourceManagement;

import com.example.demo.Entity.ResourceManagement.Resource;
import com.example.demo.Service.ResourceManagement.ResourceServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/resource")
public class ResourceController {

    @Autowired
    private ResourceServices resourceServices;

    // Add new resource
    @PostMapping("/add")
    public ResponseEntity<String> addNewResource(@RequestBody Resource resource){
        try {
            resource.setAddedDate(new Date());
            resource.setLastModifiedDate(new Date());
            resourceServices.addNewResource(resource);
            return ResponseEntity.ok(resource.getId());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error adding resource: " + e.getMessage());
        }
    }

    // Get all resources
    @GetMapping("/getAll")
    public ResponseEntity<List<Resource>> getAllResourcesDetails() {
        try {
            return ResponseEntity.ok(resourceServices.getAllResourceDetails());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // Delete resource
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteResource(@PathVariable String id) {
        try {
            resourceServices.deleteResourceItems(id);
            return ResponseEntity.ok("Resource Deleted Successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error deleting resource: " + e.getMessage());
        }
    }

    // Release resource quantity
    @PutMapping("/release/{id}")
    public ResponseEntity<?> releaseResource(
            @PathVariable String id,
            @RequestBody Map<String, Integer> body) {
        try {
            int releaseQty = body.get("releaseQuantity");
            Resource updated = resourceServices.releaseResource(id, releaseQty);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error releasing resource");
        }
    }

    // Generate resource summary report
    @GetMapping("/report/summary")
    public ResponseEntity<Map<String, Object>> getResourceSummary() {
        try {
            return ResponseEntity.ok(resourceServices.getResourceSummary());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(Collections.emptyMap());
        }
    }
}

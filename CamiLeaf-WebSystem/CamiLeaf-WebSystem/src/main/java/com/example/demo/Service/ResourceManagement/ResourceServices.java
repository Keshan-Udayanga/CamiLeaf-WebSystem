package com.example.demo.Service.ResourceManagement;

import com.example.demo.Entity.ResourceManagement.Resource;
import com.example.demo.Repo.ResourceManagement.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ResourceServices {

    @Autowired
    private ResourceRepository resourceRepository;

    // Save new resource
    public void addNewResource(Resource resource) {
        if (resource.getAddedDate() == null) {
            resource.setAddedDate(new Date());
        }
        resource.setLastModifiedDate(new Date());
        resourceRepository.save(resource);
    }

    // Get all resource details
    public List<Resource> getAllResourceDetails() {
        return resourceRepository.findAll();
    }

    // Delete a resource by ID
    public void deleteResourceItems(String id) {
        if (!resourceRepository.existsById(id)) {
            throw new RuntimeException("Resource not found with ID: " + id);
        }
        resourceRepository.deleteById(id);
    }

    // Release resource quantity
    public Resource releaseResource(String id, int releaseQty) {
        Resource resource = resourceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found"));

        if (resource.getQuantity() < releaseQty) {
            throw new RuntimeException("Not enough stock to release!");
        }

        resource.setQuantity(resource.getQuantity() - releaseQty);
        resource.setLastModifiedDate(new Date());
        return resourceRepository.save(resource);
    }

    // Generate Resource Summary Report
    public Map<String, Object> getResourceSummary() {
        List<Resource> resources = resourceRepository.findAll();

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalResources", resources.size());

        int totalQuantity = resources.stream()
                .mapToInt(r -> r.getQuantity() != 0 ? r.getQuantity() : 0)
                .sum();
        summary.put("totalQuantity", totalQuantity);

        List<Map<String, Object>> records = new ArrayList<>();
        for (Resource r : resources) {
            Map<String, Object> rec = new HashMap<>();
            rec.put("resourceId", r.getId());
            rec.put("resourceType", r.getResourceType());
            rec.put("quantity", r.getQuantity());
            rec.put("unit", r.getUnit());
            rec.put("addedDate", r.getAddedDate());
            rec.put("lastModifiedDate", r.getLastModifiedDate());
            records.add(rec);
        }

        summary.put("records", records);
        return summary;
    }
}

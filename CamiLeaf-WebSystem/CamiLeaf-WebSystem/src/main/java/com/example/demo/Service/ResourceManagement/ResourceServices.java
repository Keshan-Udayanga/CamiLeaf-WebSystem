package com.example.demo.Service.ResourceManagement;

import com.example.demo.Entity.ResourceManagement.Resource;
import com.example.demo.Repo.ResourceManagement.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ResourceServices {

    @Autowired
    private ResourceRepository resourceRepository;

    // save new item
    public void addNewResource(Resource resource){
        resourceRepository.save(resource);
    }

    // find all
    public List<Resource> getAllResourceDetails(){
        return resourceRepository.findAll();
    }

    // delete resources
    public void deleteResourceItems(String id){
        resourceRepository.deleteById(id);
    }

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


}

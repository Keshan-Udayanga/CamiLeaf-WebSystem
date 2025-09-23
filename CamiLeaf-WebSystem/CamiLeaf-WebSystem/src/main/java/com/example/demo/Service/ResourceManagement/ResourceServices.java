package com.example.demo.Service.ResourceManagement;

import com.example.demo.Entity.ResourceManagement.Resource;
import com.example.demo.Repo.ResourceManagement.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}

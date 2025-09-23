package com.example.demo.Controller.ResourceManagement;

import com.example.demo.Entity.ResourceManagement.Resource;
import com.example.demo.Service.ResourceManagement.ResourceServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/resource")
public class ResourceController {

    @Autowired
    private ResourceServices resourceServices;

    @PostMapping("/add")
    public String addNewResource(@RequestBody Resource resource){
        resource.setAddedDate(new Date());
        resource.setLastModifiedDate(new Date());
        resourceServices.addNewResource(resource);
        return resource.getId();
    }

    // get all resources
    @GetMapping("/getAll")
    public List<Resource> getAllResourcesDetails(){
        return resourceServices.getAllResourceDetails();
    }

    @GetMapping("/delete/{id}")
    public String deleteResource(@PathVariable String id){
        resourceServices.deleteResourceItems(id);
        return "Resource Deleted Successfully!";
    }

    @GetMapping("/release/{id}")
    public Resource releaseResource(
            @PathVariable String id,
            @RequestBody Map<String, Integer> body) {

        int releaseQty = body.get("releaseQuantity"); // only quantity passed
        return resourceServices.releaseResource(id, releaseQty);
    }


}

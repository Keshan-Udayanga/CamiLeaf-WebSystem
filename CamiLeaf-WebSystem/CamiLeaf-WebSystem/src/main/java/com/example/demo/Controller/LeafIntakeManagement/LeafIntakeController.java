package com.example.demo.Controller.LeafIntakeManagement;

import com.example.demo.Entity.LeafIntakeManagement.LeafIntake;
import com.example.demo.Service.LeafIntakeManagement.LeafIntakeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/leafIntake")
public class LeafIntakeController {

    @Autowired
    private LeafIntakeService leafIntakeService;

    @PostMapping("/add")
    public String addNewRecord(@RequestBody LeafIntake leafIntake){
        leafIntakeService.addNewRecord(leafIntake);
        leafIntake.setIntakeDate(new Date());
        System.out.println(leafIntake.getId());
        return leafIntake.getId();
    }

    //get all
    @GetMapping("/getAll")
    public List<LeafIntake> getAllRecord(){return leafIntakeService.getAllRecords();}

    //delete
    @DeleteMapping("/delete/{id}")
    public String deleteRecord(@PathVariable String id){
        leafIntakeService.deleteRecord(id);
        return "Deleted Successfully";
    }
    //get by id
    @GetMapping("/get/{id}")
    public LeafIntake getRecord(@PathVariable String id){return leafIntakeService.getRecordById(id);}

    //update
    @PutMapping("/update/{id}")
    public LeafIntake updateRecords(@PathVariable String id,@RequestBody LeafIntake leafIntake){

        return leafIntakeService.updateRecords(id, leafIntake);
    }

}

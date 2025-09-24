package com.example.demo.Service.LeafIntakeManagement;

import com.example.demo.Entity.LeafIntakeManagement.LeafIntake;
import com.example.demo.Repo.LeafIntakeManagement.LeafIntakeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeafIntakeService {

    @Autowired
    private LeafIntakeRepository intakeRepository;

    //save new record
    public void addNewRecord(LeafIntake leafIntake){intakeRepository.save(leafIntake);}

    //find all
    public List<LeafIntake> getAllRecords(){return intakeRepository.findAll();}

    //delete record
    public void deleteRecord(String id){intakeRepository.deleteById(id);}

       //update record
    public LeafIntake updateRecords(String id,LeafIntake updateRecord){
        LeafIntake existingRecord = intakeRepository.findById(id).orElseThrow(() -> new RuntimeException("Record not found with id: " + id));

        existingRecord.setSupplierId(updateRecord.getSupplierId());
        existingRecord.setSupplierName(updateRecord.getSupplierName());
        existingRecord.setIntakeDate(updateRecord.getIntakeDate());
        existingRecord.setWeight(updateRecord.getWeight());
        existingRecord.setStatus(updateRecord.getStatus());
        existingRecord.setRemarks(updateRecord.getRemarks());

        return intakeRepository.save(existingRecord);

    }

    public LeafIntake getRecordById(String id){return intakeRepository.findById(id).get();}


}

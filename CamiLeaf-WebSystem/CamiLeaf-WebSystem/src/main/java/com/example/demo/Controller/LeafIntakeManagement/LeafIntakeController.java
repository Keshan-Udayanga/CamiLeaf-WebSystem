package com.example.demo.Controller.LeafIntakeManagement;

import com.example.demo.Entity.LeafIntakeManagement.LeafIntake;
import com.example.demo.Service.LeafIntakeManagement.LeafIntakeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/leafIntake")
public class LeafIntakeController {

    @Autowired
    private LeafIntakeService leafIntakeService;

    // ✅ Add new record
    @PostMapping("/add")
    public ResponseEntity<String> addNewRecord(@RequestBody LeafIntake leafIntake) {
        try {
            leafIntake.setIntakeDate(new Date()); // Auto-set intake date
            leafIntakeService.addNewRecord(leafIntake);
            System.out.println("✅ New Leaf Intake Record Added for Supplier: " + leafIntake.getSupplierName());
            return ResponseEntity.ok("Record added successfully with ID: " + leafIntake.getId());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error while adding record: " + e.getMessage());
        }
    }

    // ✅ Get all records
    @GetMapping("/getAll")
    public ResponseEntity<List<LeafIntake>> getAllRecords() {
        try {
            List<LeafIntake> records = leafIntakeService.getAllRecords();
            return ResponseEntity.ok(records);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    // ✅ Get record by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getRecordById(@PathVariable String id) {
        try {
            LeafIntake record = leafIntakeService.getRecordById(id);
            return ResponseEntity.ok(record);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error retrieving record");
        }
    }

    // ✅ Update existing record
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateRecord(@PathVariable String id, @RequestBody LeafIntake leafIntake) {
        try {
            LeafIntake updated = leafIntakeService.updateRecords(id, leafIntake);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error updating record");
        }
    }

    // ✅ Delete record
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRecord(@PathVariable String id) {
        try {
            leafIntakeService.deleteRecord(id);
            return ResponseEntity.ok("Record deleted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error deleting record: " + e.getMessage());
        }
    }

    // ✅ Generate summary report (for frontend PDF or dashboard)
    @GetMapping("/report/summary")
    public ResponseEntity<Map<String, Object>> getLeafIntakeSummary() {
        try {
            Map<String, Object> summary = leafIntakeService.getLeafIntakeSummary();
            return ResponseEntity.ok(summary);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}

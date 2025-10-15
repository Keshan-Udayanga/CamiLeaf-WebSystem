package com.example.demo.Service.LeafIntakeManagement;

import com.example.demo.Entity.LeafIntakeManagement.LeafIntake;
import com.example.demo.Repo.LeafIntakeManagement.LeafIntakeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class LeafIntakeService {

    @Autowired
    private LeafIntakeRepository intakeRepository;

    // ✅ Save new record (auto-assign intake date if not set)
    public void addNewRecord(LeafIntake leafIntake) {
        if (leafIntake.getIntakeDate() == null) {
            leafIntake.setIntakeDate(new Date());
        }
        if (leafIntake.getWeight() <= 0) {
            throw new IllegalArgumentException("Weight must be greater than 0");
        }
        intakeRepository.save(leafIntake);
    }

    // ✅ Get all records
    public List<LeafIntake> getAllRecords() {
        return intakeRepository.findAll();
    }

    // ✅ Get a record by ID
    public LeafIntake getRecordById(String id) {
        return intakeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found with ID: " + id));
    }

    // ✅ Delete a record by ID
    public void deleteRecord(String id) {
        if (!intakeRepository.existsById(id)) {
            throw new RuntimeException("Record not found with ID: " + id);
        }
        intakeRepository.deleteById(id);
    }

    // ✅ Update a record
    public LeafIntake updateRecords(String id, LeafIntake updatedRecord) {
        LeafIntake existingRecord = intakeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found with ID: " + id));

        // Update fields
        existingRecord.setSupplierId(updatedRecord.getSupplierId());
        existingRecord.setSupplierName(updatedRecord.getSupplierName());
        existingRecord.setIntakeDate(
                updatedRecord.getIntakeDate() != null ? updatedRecord.getIntakeDate() : existingRecord.getIntakeDate()
        );
        existingRecord.setWeight(updatedRecord.getWeight());
        existingRecord.setStatus(updatedRecord.getStatus());
        existingRecord.setRemarks(updatedRecord.getRemarks());

        return intakeRepository.save(existingRecord);
    }

    // ✅ Generate Leaf Intake Summary Report Data
    public Map<String, Object> getLeafIntakeSummary() {
        List<LeafIntake> records = intakeRepository.findAll();

        // Handle empty dataset gracefully
        if (records.isEmpty()) {
            Map<String, Object> emptySummary = new HashMap<>();
            emptySummary.put("totalRecords", 0);
            emptySummary.put("totalWeight", 0.0);
            emptySummary.put("statusCount", Collections.emptyMap());
            emptySummary.put("records", Collections.emptyList());
            return emptySummary;
        }

        double totalWeight = records.stream()
                .mapToDouble(LeafIntake::getWeight)
                .sum();

        long totalRecords = records.size();

        // Group by status (e.g., Pending, Approved, Rejected)
        Map<String, Long> statusCount = records.stream()
                .collect(Collectors.groupingBy(
                        r -> Optional.ofNullable(r.getStatus()).orElse("Unknown"),
                        Collectors.counting()
                ));

        // Prepare summary map
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalRecords", totalRecords);
        summary.put("totalWeight", totalWeight);
        summary.put("statusCount", statusCount);
        summary.put("records", records);

        return summary;
    }
}

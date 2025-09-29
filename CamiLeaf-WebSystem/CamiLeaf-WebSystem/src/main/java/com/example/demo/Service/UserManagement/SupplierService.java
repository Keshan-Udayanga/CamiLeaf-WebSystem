package com.example.demo.Service.UserManagement;

import com.example.demo.Entity.UserManagement.Supplier;
import com.example.demo.Repo.UserManagement.SupplierRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierService {

    private final SupplierRepository supplierRepository;

    public SupplierService(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    public Supplier saveSupplier(Supplier supplier) {
        // Generate supplierCode
        Supplier lastSupplier = supplierRepository.findTopByOrderByCreatedAtDesc();
        String newCode;

        if (lastSupplier == null) {
            newCode = "SUP001";
        } else {
            String lastCode = lastSupplier.getSupplierCode(); // e.g., SUP009
            int lastNum = Integer.parseInt(lastCode.replace("SUP", ""));
            newCode = String.format("SUP%03d", lastNum + 1);
        }

        supplier.setSupplierCode(newCode);

        return supplierRepository.save(supplier);
    }

    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    public Supplier getSupplierById(String id) {
        return supplierRepository.findById(id).orElse(null);
    }
}


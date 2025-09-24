
package com.example.demo.Entity.LeafIntakeManagement;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "LeafIntakes")
public class LeafIntake {

    @Id
    private String id;
    private String supplierId;
    private String supplierName;
    @CreatedDate
    private Date intakeDate;
    private double weight;
    private String status;
    private String remarks;

    public LeafIntake(){}

    public LeafIntake(String supplierId, String supplierName, double weight, String status, String remarks) {
        this.supplierId = supplierId;
        this.supplierName = supplierName;
        this.weight = weight;
        this.status = status;
        this.remarks = remarks;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(String supplierId) {
        this.supplierId = supplierId;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void setSupplierName(String supplierName) {
        this.supplierName = supplierName;
    }

    public Date getIntakeDate() {
        return intakeDate;
    }

    public void setIntakeDate(Date intakeDate) {
        this.intakeDate = intakeDate;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}

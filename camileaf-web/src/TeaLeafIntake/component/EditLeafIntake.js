// File: EditLeafIntake.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/EditLeafIntake.css";

export default function EditLeafIntake() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    supplierId: "",
    supplierName: "",
    intakeDate: "",
    weight: "",
    status: "Pending",
    remarks: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch record by id
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8081/api/v1/leafIntake/get/${id}`
        );
        const record = res.data;
        setFormData({
          supplierId: record.supplierId,
          supplierName: record.supplierName,
          intakeDate: record.intakeDate
            ? new Date(record.intakeDate).toISOString().slice(0, 16)
            : "",
          weight: record.weight,
          status: record.status,
          remarks: record.remarks || "",
        });
      } catch (err) {
        console.error("Error fetching record:", err);
        setError("Failed to load record. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation
  const validateForm = () => {
    const errors = {};

    // Supplier ID validation: start with a letter, 3-10 chars, letters/numbers/_/-
    if (!formData.supplierId.trim()) {
      errors.supplierId = "Supplier ID is required.";
    } else if (!/^[A-Za-z][A-Za-z0-9_-]{2,9}$/.test(formData.supplierId)) {
      errors.supplierId =
        "Supplier ID must start with a letter, be 3-10 characters long, and can include letters, numbers, underscores, or dashes.";
    }

    // Supplier Name: not empty
    if (!formData.supplierName.trim()) {
      errors.supplierName = "Supplier Name is required.";
    }

    // Intake Date: required
    if (!formData.intakeDate) {
      errors.intakeDate = "Intake Date is required.";
    }

    // Weight: must be > 0
    if (!formData.weight) {
      errors.weight = "Weight is required.";
    } else if (parseFloat(formData.weight) <= 0) {
      errors.weight = "Weight must be greater than 0.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.put(
        `http://localhost:8081/api/v1/leafIntake/update/${id}`,
        {
          ...formData,
          weight: parseFloat(formData.weight),
          intakeDate: new Date(formData.intakeDate),
        }
      );

      // Show alert after successful edit
      window.alert("Edit Successfully!");

      // Redirect after alert
      navigate("/admin/leaf-intake/intakes-details");
    } catch (err) {
      console.error("Error updating record:", err);
      setError(
        "Failed to update record. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/leaf-intake/intakes-details");
  };

  if (loading) {
    return (
      <div className="edit-form-overlay">
        <div className="edit-form-container loading-container">
          <div className="loading-spinner"></div>
          <p>Loading record details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-form-overlay">
      <div className="edit-form-container">
        <div className="form-header">
          <div className="header-icon">✏️</div>
          <h2>Edit Leaf Intake Record</h2>
          <p>Update the tea leaf intake information below</p>
        </div>

        {/* Error */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-grid">
            {/* Supplier ID */}
            <div className="input-group">
              <label className="input-label">
                <span className="label-text">Supplier ID</span>
                <input
                  type="text"
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleChange}
                  required
                  className={`input-field ${
                    formErrors.supplierId ? "input-error" : ""
                  }`}
                  placeholder="Enter supplier ID"
                />
              </label>
              {formErrors.supplierId && (
                <p className="error-text">{formErrors.supplierId}</p>
              )}
            </div>

            {/* Supplier Name */}
            <div className="input-group">
              <label className="input-label">
                <span className="label-text">Supplier Name</span>
                <input
                  type="text"
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleChange}
                  required
                  className={`input-field ${
                    formErrors.supplierName ? "input-error" : ""
                  }`}
                  placeholder="Enter supplier name"
                />
              </label>
              {formErrors.supplierName && (
                <p className="error-text">{formErrors.supplierName}</p>
              )}
            </div>

            {/* Intake Date */}
            <div className="input-group">
              <label className="input-label">
                <span className="label-text">Intake Date & Time</span>
                <input
                  type="datetime-local"
                  name="intakeDate"
                  value={formData.intakeDate}
                  onChange={handleChange}
                  required
                  className={`input-field ${
                    formErrors.intakeDate ? "input-error" : ""
                  }`}
                />
              </label>
              {formErrors.intakeDate && (
                <p className="error-text">{formErrors.intakeDate}</p>
              )}
            </div>

            {/* Weight */}
            <div className="input-group">
              <label className="input-label">
                <span className="label-text">Weight (Kg)</span>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  required
                  className={`input-field ${
                    formErrors.weight ? "input-error" : ""
                  }`}
                  placeholder="0.00"
                />
              </label>
              {formErrors.weight && (
                <p className="error-text">{formErrors.weight}</p>
              )}
            </div>

            {/* Status */}
            <div className="input-group">
              <label className="input-label">
                <span className="label-text">Status</span>
                <div className="select-wrapper">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="select-field"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <span className="select-arrow">▼</span>
                </div>
              </label>
            </div>

            {/* Remarks */}
            <div className="input-group full-width">
              <label className="input-label">
                <span className="label-text">Remarks</span>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  rows="3"
                  className="textarea-field"
                  placeholder="Additional notes or comments..."
                />
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn-save ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="btn-spinner"></span>
                  Updating...
                </>
              ) : (
                <>
                  <span className="btn-icon">✓</span>
                  Update Record
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

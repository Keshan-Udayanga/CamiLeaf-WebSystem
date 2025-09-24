// File: Record.js (Final)
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiArrowDown,
  FiPlus,
} from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "../Styles/Record.css";

export default function Record() {
  const navigate = useNavigate(); // ✅ Initialize navigate

  const [formData, setFormData] = useState({
    supplierId: "",
    supplierName: "",
    intakeDate: new Date(),
    weight: "",
    status: "Pending",
    remarks: "",
  });

  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, intakeDate: date }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.supplierId) tempErrors.supplierId = "Supplier ID is required";
    if (!formData.supplierName) tempErrors.supplierName = "Supplier Name is required";
    if (!formData.intakeDate) tempErrors.intakeDate = "Intake date and time is required";
    if (!formData.weight || Number(formData.weight) <= 0) tempErrors.weight = "Weight must be greater than 0";
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = validate();
    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      await axios.post("http://localhost:8081/api/v1/leafIntake/add", {
        supplierId: formData.supplierId,
        supplierName: formData.supplierName,
        intakeDate: formData.intakeDate,
        weight: parseFloat(formData.weight),
        status: formData.status,
        remarks: formData.remarks,
      });

      setNotice({
        type: "success",
        message: "Tea leaf intake recorded successfully!",
      });

      setFormData({
        supplierId: "",
        supplierName: "",
        intakeDate: new Date(),
        weight: "",
        status: "Pending",
        remarks: "",
      });
    } catch (error) {
      console.error("Error saving record:", error);
      setNotice({
        type: "error",
        message: "Failed to save record. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      supplierId: "",
      supplierName: "",
      intakeDate: new Date(),
      weight: "",
      status: "Pending",
      remarks: "",
    });
    setErrors({});
    setNotice({ type: "", message: "" });
  };

  const scrollToForm = () => {
    document.getElementById("intake-form").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Tea Leaf Intake System</h1>
          <p className="hero-subtitle">
            Streamline your tea leaf collection process with our modern intake
            management system. Record, track, and manage supplier deliveries
            efficiently.
          </p>

          {/* Button for scrolling to the form */}
          <button className="hero-btn" onClick={() => navigate("/admin/leaf-intake/intakes-details")}>
            <FiPlus /> Intake Details
          </button>
        </div>
        <div className="scroll-indicator">
          Scroll to explore
          <FiArrowDown />
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div id="intake-form" className="intake-form-container">
          <h3>Record Tea Leaf Intake</h3>

          {notice.message && (
            <div className={`notice ${notice.type}`}>
              <span className="notice-icon">
                {notice.type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
              </span>
              <p>{notice.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label>
              Supplier ID
              <input
                type="text"
                name="supplierId"
                value={formData.supplierId}
                onChange={handleChange}
                className={errors.supplierId ? "error-input" : ""}
                placeholder="Enter supplier ID"
              />
              {errors.supplierId && (
                <span className="error">{errors.supplierId}</span>
              )}
            </label>

            <label>
              Supplier Name
              <input
                type="text"
                name="supplierName"
                value={formData.supplierName}
                onChange={handleChange}
                className={errors.supplierName ? "error-input" : ""}
                placeholder="Enter supplier name"
              />
              {errors.supplierName && (
                <span className="error">{errors.supplierName}</span>
              )}
            </label>

            <label>
              Intake Date & Time
              <DatePicker
                selected={formData.intakeDate}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className={errors.intakeDate ? "error-input" : ""}
              />
              {errors.intakeDate && (
                <span className="error">{errors.intakeDate}</span>
              )}
            </label>

            <label>
              Weight (Kg)
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className={errors.weight ? "error-input" : ""}
                placeholder="Enter weight in kilograms"
                step="0.01"
                min="0"
              />
              {errors.weight && <span className="error">{errors.weight}</span>}
            </label>

            <label>
              Remarks
              <textarea
                name="remarks"
                rows="3"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Additional notes or comments..."
              />
            </label>

            <div className="form-actions">
              <button
                type="submit"
                className={`btn-save ${isSubmitting ? "submitting" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Record"}
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={handleClear}
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

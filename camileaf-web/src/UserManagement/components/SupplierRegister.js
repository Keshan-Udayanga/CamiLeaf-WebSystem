import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SupplierRegister.css";
import api from "../../axiosConfig";

export default function SupplierRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    supplierName: "",
    contactNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.supplierName) tempErrors.supplierName = "Supplier name is required";
    if (!formData.contactNumber) {
      tempErrors.contactNumber = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      tempErrors.contactNumber = "Enter a valid 10-digit number";
    }
    if (!formData.address) tempErrors.address = "Address is required";
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
      await api.post("/api/v1/suppliers/add", formData);

      setNotice({ type: "success", message: "Supplier registered successfully!" });

      setTimeout(() => {
        navigate("/admin/leaf-intake"); 
      }, 1500);
    } catch (error) {
      console.error("Error registering supplier:", error);
      setNotice({
        type: "error",
        message: "Failed to register supplier. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="supplier-register-container">
      <h2>Register Supplier</h2>

      {notice.message && (
        <div className={`notice ${notice.type}`}>
          {notice.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="supplier-form">
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
          {errors.supplierName && <span className="error">{errors.supplierName}</span>}
        </label>

        <label>
          Contact Number
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className={errors.contactNumber ? "error-input" : ""}
            placeholder="Enter contact number"
            maxLength={10}
          />
          {errors.contactNumber && <span className="error">{errors.contactNumber}</span>}
        </label>

        <label>
          Address
          <textarea
            name="address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? "error-input" : ""}
            placeholder="Enter supplier address"
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </label>

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting} className="btn-save">
            {isSubmitting ? "Registering..." : "Register Supplier"}
          </button>
          <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// File: EditLeafIntake.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/EditLeafIntake.css";
import api from "../../axiosConfig";

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

  // Fetch record by id
  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const res = await api.get(
          `/api/v1/leafIntake/get/${id}`
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
        setError("Failed to load record.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        `/api/v1/leafIntake/update/${id}`,
        {
          ...formData,
          weight: parseFloat(formData.weight),
          intakeDate: new Date(formData.intakeDate),
        }
      );
      navigate("/admin/leaf-intake/intakes-details"); // redirect back to table page
    } catch (err) {
      console.error("Error updating record:", err);
      setError("Failed to update record.");
    }
  };

  if (loading) return <p>Loading record...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="edit-page">
      <h3>Edit Leaf Intake Record</h3>
      <form onSubmit={handleSubmit} className="edit-form">
        <label>
          Supplier ID
          <input
            type="text"
            name="supplierId"
            value={formData.supplierId}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Supplier Name
          <input
            type="text"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Intake Date & Time
          <input
            type="datetime-local"
            name="intakeDate"
            value={formData.intakeDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Weight (Kg)
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </label>

        <label>
          Status
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>

        <label>
          Remarks
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows="3"
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="btn-save">Update</button>
          <button type="button" className="btn-cancel" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

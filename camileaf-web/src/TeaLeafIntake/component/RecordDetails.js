import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/RecordDetails.css";

export default function LeafIntakeTable() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/v1/leafIntake/getAll");
      setRecords(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch records.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await axios.delete(`http://localhost:8081/api/v1/leafIntake/delete/${id}`);
      setRecords(prev => prev.filter(record => record.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete record.");
    }
  };

  return (
    <div className="table-container">
      <h3>Tea Leaf Intake Records</h3>

      {loading && <p>Loading records...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && records.length === 0 && <p className="no-data">No records found</p>}

      {!loading && records.length > 0 && (
        <table className="records-table">
          <thead>
            <tr>
              <th>Intake ID</th>
              <th>Supplier ID</th>
              <th>Supplier Name</th>
              <th>Intake Date & Time</th>
              <th>Weight (Kg)</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map(record => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.supplierId}</td>
                <td>{record.supplierName}</td>
                <td>{record.intakeDate ? new Date(record.intakeDate).toLocaleString() : "N/A"}</td>
                <td>{record.weight}</td>
                <td>{record.status}</td>
                <td>{record.remarks || "-"}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => navigate(`/admin/leaf-intake/edit/${record.id}`)}
                  >
                    Edit
                  </button>

                  <button className="btn-delete" onClick={() => handleDelete(record.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

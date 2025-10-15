import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/OrderEditForm.css";
import api from "../../axiosConfig";

export default function OrderEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/api/v1/order/get/${id}`);
        setStatus(res.data.status || "Pending");
      } catch (err) {
        alert("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/v1/order/update/${id}`, { status });
      alert("✅ Order updated successfully!");
      navigate("/admin/order-management");
    } catch (err) {
      console.error("Error updating status:", err);
      alert("❌ Failed to update order. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading order...</p>
      </div>
    );

  return (
    <div className="order-edit-wrapper">
      <div className="order-edit-container">
        <div className="form-header">
          <h2>Update Order Status</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Order Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-select"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/admin/orders")}
            >
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/OrderEditForm.css"; // ✅ Import CSS file

export default function OrderEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/api/v1/order/get/${id}`);
        setStatus(res.data.status || "Pending");
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/api/v1/order/update/${id}`, { status });
      navigate("/admin/order-management"); // go back to table page
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) return <p>Loading order...</p>;

  return (
    <div className="order-edit-container">
      <h3>Update Order Status</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <div className="form-buttons">
          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="cancel-btn" onClick={() => navigate("/admin/orders")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

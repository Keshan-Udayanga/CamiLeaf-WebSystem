import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/OrderManagement.css";

function AdminOrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/v1/order/getAll");
      const data = response.data.map(order => ({
        ...order,
        items: order.items || [], // ✅ use backend `items`
        shipping: {
          fullName: order.fullName || "",
          email: order.email || "",
          address: order.address || "",
          city: order.city || "",
          zip: order.zip || ""
        },
        payment: {
          method: order.paymentMethod || "cod"
        },
        status: order.status || "Pending"
      }));
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8081/api/v1/order/delete/${orderId}`);
      setOrders(prev => prev.filter(order => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading orders...</p>;

  return (
    <div className="order-dashboard">
      <h1>📝 Orders Dashboard</h1>
      <table className="dashboard-table">
        <thead style={{background:"#d0a15e"}}>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Shipping Address</th>
            <th>City</th>
            <th>ZIP</th>
            <th>Payment Method</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Change Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.shipping.fullName}</td>
                <td>{order.shipping.email}</td>
                <td>{order.shipping.address}</td>
                <td>{order.shipping.city}</td>
                <td>{order.shipping.zip}</td>
                <td>{order.payment.method === "card" ? "Credit/Debit Card" : "Cash on Delivery"}</td>
                <td>
                  <ul className="order-items-list">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.productName} (x{item.quantity})
                      </li>
                    ))}
                  </ul>
                </td>
                <td>Rs. {order.total.toLocaleString()}</td>
                <td className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </td>
                <td>
                  <button
                    onClick={() => navigate(`/admin/order-management/edit/${order.id}`)}
                    className="btn-change"
                  >
                    Change Status
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" style={{ textAlign: "center", color: "#999" }}>
                No orders available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminOrdersTable;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/OrderManagement.css";

function AdminOrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/v1/order/getAll");
      const data = response.data.map(order => ({
        ...order,
        cartItems: order.cartItems || [],
        shipping: {
          fullName: order.fullName || "",
          email: order.email || "",
          address: order.address || "",
          city: order.city || "",
          zip: order.zip || ""
        },
        payment: {
          method: order.paymentMethod || "cod"
        }
      }));
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:8081/api/v1/order/update/${orderId}`, {
        status: newStatus
      });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8081/api/v1/order/delete/${orderId}`);
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading orders...</p>;
  }

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.shipping.fullName}</td>
                <td>{order.shipping.email}</td>
                <td>{order.shipping.address}</td>
                <td>{order.shipping.city}</td>
                <td>{order.shipping.zip}</td>
                <td>
                  {order.payment.method === "card"
                    ? "Credit/Debit Card"
                    : "Cash on Delivery"}
                </td>
                <td>
                  <ul className="order-items-list">
                    {order.cartItems.map((item) => (
                      <li key={item.id}>
                        {item.name} (x{item.qty})
                      </li>
                    ))}
                  </ul>
                </td>
                <td>Rs. {order.total.toLocaleString()}</td>
                <td>{order.status || "Pending"}</td>
                <td>
                  <button
                    onClick={() =>
                      updateStatus(
                        order.id,
                        order.status === "Pending"
                          ? "Processing"
                          : order.status === "Processing"
                          ? "Completed"
                          : "Pending"
                      )
                    }
                    style={{ marginRight: "5px" }}
                  >
                    Change Status
                  </button>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" style={{ textAlign: "center", color: "#999" }}>
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

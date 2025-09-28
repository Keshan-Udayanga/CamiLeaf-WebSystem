import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/OrderManagement.css";
import api from "../../axiosConfig";

function AdminOrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/api/v1/order/getAll");
      const data = response.data.map(order => ({
        ...order,
        items: order.items || [],
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
      await api.delete(`/api/v1/order/delete/${orderId}`);
      setOrders(prev => prev.filter(order => order.id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Filter orders based on status and search term
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === "all" || order.status.toLowerCase() === filterStatus;
    const matchesSearch = order.shipping.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toString().includes(searchTerm) ||
                         order.shipping.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading orders...</p>
    </div>
  );

  return (
    <div className="order-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>
            Orders Dashboard
          </h1>
          <p>Manage and track all customer orders</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">{orders.length}</span>
            <span className="stat-label">Total Orders</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="dashboard-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="    Search by name, email, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Payment</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>
                    <div className="order-id">#{order.id}</div>
                  </td>
                  <td>
                    <div className="customer-info">
                      <div className="customer-name">{order.shipping.fullName}</div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div className="email">{order.shipping.email}</div>
                    </div>
                  </td>
                  <td>
                    <div className="location-info">
                      <div className="city">{order.shipping.city}</div>
                      <div className="zip">{order.shipping.zip}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`payment-method ${order.payment.method}`}>
                      {order.payment.method === "card" ? "Card" : "COD"}
                    </span>
                  </td>
                  <td>
                    <div className="items-preview">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="item-tag">
                          {item.productName} (x{item.quantity})
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="more-items">+{order.items.length - 2} more</div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="total-amount">
                      Rs. {order.total.toLocaleString()}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => navigate(`/admin/order-management/edit/${order.id}`)}
                        className="btn-action btn-edit"
                        title="Change Status"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="btn-action btn-delete"
                        title="Delete Order"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-orders">
                  <div className="no-orders-content">
                    <span className="no-orders-icon">📭</span>
                    <p>No orders found</p>
                    <small>Try adjusting your search or filter</small>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminOrdersTable;
import React from "react";
import "../Styles/OrderManagement.css";

function AdminOrdersTable({ orders }) {
  return (
    <div className="order-dashboard">
      <h1>📝 Orders Dashboard</h1>

      <table className="dashboard-table">
        <thead>
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
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: "center", color: "#999" }}>
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

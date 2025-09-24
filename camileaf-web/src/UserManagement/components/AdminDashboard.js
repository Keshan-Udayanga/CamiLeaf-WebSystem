import {useNavigate, Link} from 'react-router-dom';

import React, {useEffect} from 'react';
import '../styles/AdminDashboard.css';
import userManagement from '../assests/usermg.jpg'
import productManagement from '../assests/product.jpg'
import reports from '../assests/report.webp'


function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if(!token || role !== "ADMIN"){
    navigate("/login");
  }
}, []);

  return (
    <div className="dashboard">
  <h1>Welcome to Admin Panel</h1>

  <div className="cards-container">
    <Link to="/admin/user-management" className="card" style={{ textDecoration: "none" }}>
      <img src={userManagement} alt="User Management" />
      <h3>User Management</h3>
    </Link>

    <Link to="/admin/product-management" className="card" style={{ textDecoration: "none" }}>
      <img src={productManagement} alt="Product Management" />
      <h3>Product Management</h3>
    </Link>

    <Link to="/admin/order-management" className="card" style={{ textDecoration: "none" }}>
      <img src={productManagement} alt="Order Management" />
      <h3>Order Management</h3>
    </Link>
  </div>

  <div className="cards-container">
    <Link to="/admin/resource-management" className="card" style={{ textDecoration: "none" }}>
      <img src={productManagement} alt="Resource Management" />
      <h3>Resource Management</h3>
    </Link>

    <Link to="/admin/leaf-intake" className="card" style={{ textDecoration: "none" }}>
      <img src={productManagement} alt="Tea Leaf Intake" />
      <h3>Tea Leaf Intake</h3>
    </Link>

    <Link to="/admin/company-reports" className="card" style={{ textDecoration: "none" }}>
      <img src={reports} alt="Company Reports" />
      <h3>Company Reports</h3>
    </Link>
  </div>
</div>

  );
}

export default Dashboard;

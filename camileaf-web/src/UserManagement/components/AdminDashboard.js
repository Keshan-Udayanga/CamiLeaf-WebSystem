import {Link} from 'react-router-dom';

import React from 'react';
import '../styles/AdminDashboard.css';
import userManagement from '../assests/usermg.jpg'
import productManagement from '../assests/product.jpg'
import reports from '../assests/report.webp'

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Welcome to Admin Panel</h1>
      <div className="cards-container">
        <Link
          to="/admin/user-management"
          className="card"  // Add class here
          style={{ textDecoration: "none", color: "inherit" }}
    >
          <img src={userManagement} alt="User Management" />
          <h3>User Management</h3>
        
        </Link>
        <div className="card">
          <img src={productManagement} alt="Product Management" />
          <h3>Product Management</h3>
        </div>
        <div className="card">
          <img src={reports} alt="Product Management" />
          <h3>Company Reports</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

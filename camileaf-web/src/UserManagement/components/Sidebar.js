import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/admin" style={{ textDecoration: 'none' }}>
        <h2 className="sidebar-title">Admin Panel</h2>
      </Link>
      <ul>
        <li>
          <NavLink
            to="/admin/user-management"
            className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
          >
            User Management
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/product-management"
            className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
          >
            Product Management
          </NavLink>
        </li>
                <li><NavLink
            to="/admin/order-management"
            className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
          >
            Order Management
          </NavLink>
          </li>
        <li>
          <NavLink
            to="/admin/resource-management"
            className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
          >
            Resource Management
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/company-reports"
            className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
          >
            Company Reports
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

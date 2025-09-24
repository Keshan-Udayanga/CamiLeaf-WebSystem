import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login', { replace: true });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
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

      <div className="sidebar-bottom">
        <button onClick={handleLogout} className="sidebar-logout">
          Logout
        </button>
      </div>
    
    </div>
      
    
  );
}

export default Sidebar;

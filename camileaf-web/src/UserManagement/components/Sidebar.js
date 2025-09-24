import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role")?.toUpperCase();

  const links = [
  { to: "/admin/user-management", label: "User Management", roles: ["ADMIN"] },
  { to: "/admin/product-management", label: "Product Management", roles: ["ADMIN"] },
  { to: "/admin/order-management", label: "Order Management", roles: ["ADMIN"] },
  { to: "/admin/resource-management", label: "Resource Management", roles: ["ADMIN","RESOURCE MANAGER"] },
  { to: "/admin/leaf-intake", label: "Tea Leaf Intake", roles: ["ADMIN","LEAF CLERK"] },
  { to: "/admin/company-reports", label: "Company Reports", roles: ["ADMIN","RESOURCE MANAGER","LEAF CLERK"] },
  ];


  const handleLogout = () => {
    const confirmed = window.confirm('Do you want to log out?'); 
    if (confirmed) {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login', { replace: true });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <Link to="/admin" style={{ textDecoration: 'none' }}>
        <h2 className="sidebar-title">Admin Panel</h2>
      </Link>
      <ul>
        {links.map(link => (
          link.roles.includes(role) && (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
              >
                {link.label}
              </NavLink>
            </li>
          )
        ))}
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

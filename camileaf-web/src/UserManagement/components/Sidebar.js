import React from 'react';
import '../styles/Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li>User Management</li>
        <li>Product Management</li>
        <li>Company Reports</li>
      </ul>
    </div>
  );
}

export default Sidebar;

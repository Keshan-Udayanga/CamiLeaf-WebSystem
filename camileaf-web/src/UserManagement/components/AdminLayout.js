import React from 'react';
import Sidebar from './Sidebar';
import Dashboard from './adminDashboard';
import "../styles/AdminLayout.css"


function AdminLayout() {
  return (
     <div className="app-container">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default AdminLayout;

import React from 'react';
import { Routes, Route } from "react-router-dom";
import Sidebar from './Sidebar';
import Dashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import AddUserForm from './AddUserForm';
import AdminProductTable from "../../ProductManagement/components/ProductManagement";
import ResourceManagement from "../../ResourceManagement/components/ResourceManagement";

function App() {
  return (
     <div style={{
      display: "flex",
      height: "100vh",        
      overflow: "hidden"      
    }}>
      <Sidebar />

      <main style={{
        flex: 1,
        padding: "20px",
        overflowY: "auto"     
      }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="add-user" element={<AddUserForm />} />
          <Route path="/product-management/*" element={<AdminProductTable />} />
          <Route path="/resource-management/*" element={<ResourceManagement />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

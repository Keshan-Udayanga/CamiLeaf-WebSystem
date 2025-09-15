import React from 'react';
import { Routes, Route } from "react-router-dom";
import Sidebar from './Sidebar';
import Dashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import AddUserForm from './AddUserForm';


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
        </Routes>
      </main>
    </div>
  );
}

export default App;

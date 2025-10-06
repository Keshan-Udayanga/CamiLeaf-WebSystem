import React from 'react';
import { Routes, Route } from "react-router-dom";
import Sidebar from './Sidebar';
import Dashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import AddUserForm from './AddUserForm';
import AdminProductTable from "../../ProductManagement/components/ProductManagement";
import OrederManagement from "../../OrderManagement/components/OrederManagement";
import TeaLeafIntake from "../../TeaLeafIntake/component/TeaLeafIntake";
import ResourceManagement from "../../ResourceManagement/components/ResourceManagement";
import SupplierRegister from "./SupplierRegister";
import CompanyReport from '../../CompanyReport/components/CompanyReport';
import GeographicalDistribution from '../../CompanyReport/components/GeographicalDistribution';

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
          <Route path="/order-management/*" element={<OrederManagement />} />
          <Route path="/resource-management/*" element={<ResourceManagement />} />
          <Route path="/leaf-intake/*" element={<TeaLeafIntake />} />
          <Route path="/supplier/register" element={<SupplierRegister />} />
          <Route path="/company-reports" element={<CompanyReport />} />
          <Route path="/reports/geographical" element={<GeographicalDistribution />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

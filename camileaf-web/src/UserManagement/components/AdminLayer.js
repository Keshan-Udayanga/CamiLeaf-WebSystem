import React from 'react';
import '../styles/AdminLayer.css';
import Sidebar from './Sidebar';
import Dashboard from './AdminDashboard';


function App() {
  return (
     <div className="app-container">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;

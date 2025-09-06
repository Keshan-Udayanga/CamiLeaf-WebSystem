

import React, {useState} from "react";
import "../styles/UserManagement.css";
import { TextField, Select, MenuItem, Button, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, IconButton } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const [role, setRole] = useState('');     
  const [status, setStatus] = useState('');

  const navigate = useNavigate();

  const handleAddUserClick = () => {
    navigate('/admin/add-user');
  };

  return (
    <div className="user-management-container">
      
      <h1 className="user-management-header">User Management</h1>
      <p className="user-management-subtitle">Manage all users with ease and efficiency</p>

      
      <div className="user-management-filters">
        <div className="filters-left">
          <TextField variant="outlined" size="small" placeholder="Search..." className="filter-item" />
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            variant="outlined"
            size="small"
            displayEmpty
            className="filter-item"
            renderValue={(selected) => selected === '' ? 'All Roles' : selected}
          >
            <MenuItem value="">All Roles</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </Select>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            variant="outlined"
            size="small"
            displayEmpty
            className="filter-item"
            renderValue={(selected) => selected === '' ? 'All Status' : selected}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
          <TextField variant="outlined" size="small" type="date" className="filter-item" />
        </div>

        
        <div className="filters-right">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            className="add-user-button"
            onClick={handleAddUserClick}
          >
            Add User
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table className="user-table">
        <TableHead>
          <TableRow className="user-table-header">
            <TableCell padding="checkbox"><Checkbox /></TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Last Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Dummy row - replace with map from real data */}
          <TableRow>
            <TableCell padding="checkbox"><Checkbox /></TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>john_doe</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>2025-09-01</TableCell>
            <TableCell>
              <IconButton color="primary"><Edit /></IconButton>
              <IconButton color="error"><Delete /></IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* Pagination Footer */}
      <div className="user-pagination">
        <div className="rows-info">Showing 1-10 of 50 users</div>
        <div className="pagination-buttons">
          <Button size="small">1</Button>
          <Button size="small">2</Button>
          <span>...</span>
          <Button size="small">5</Button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

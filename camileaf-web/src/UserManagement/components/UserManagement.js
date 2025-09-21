

import React, {useEffect, useState} from "react";
import "../styles/UserManagement.css";
import { TextField, Select, MenuItem, Button, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { formatDistanceToNow } from 'date-fns';

const UserManagement = () => {
  const [role, setRole] = useState('');     
  const [status, setStatus] = useState('');
  const [users, setUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setcurrentPage] = useState(1);
  const pageSize = 10;

  const navigate = useNavigate();

  const handleAddUserClick = () => {
    navigate('/admin/add-user');
  };

useEffect(() => {
  (async () => await Load())();
}, []);


  async function Load() {
    const result = await axios.get(
      "http://localhost:8080/api/v1/user/getAll"
    )
    setUser(result.data);
  }

  const handleEditClick = (user) => {
    navigate('/admin/add-user', { state: { user }});
  };

  const handleDeleteClick = async (userId) =>{
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    if(!confirmDelete) return;

    try{
      await axios.delete("http://localhost:8080/api/v1/user/delete/" + userId);
      alert('User deleted successfully!');
      await Load();
    }catch(error){
      console.error('Failed to delete user:', error);
      alert('Error deleting user');
    }
  };

  const filteredUsers = users.filter(user => {
  const matchesRole = role === '' || user.role === role;
  const matchesStatus = status === '' || user.status.toLowerCase() === status.toLowerCase();
  const matchesSearch = searchTerm === '' || (
    user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return matchesRole && matchesStatus && matchesSearch;
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredUsers.length / pageSize);


  return (
    <div className="user-management-container">
      
      <h1 className="user-management-header">User Management</h1>
      <p className="user-management-subtitle">Manage all users with ease and efficiency</p>

      
      <div className="user-management-filters">
        <div className="filters-left">
          <TextField 
          variant="outlined"
          size="small" 
          placeholder="Search..." 
          className="filter-item" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}/>

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
            <MenuItem value="Resource Manager">Resource Manager</MenuItem>
            <MenuItem value="Leaf Clerk">Leaf Clerk</MenuItem>
            <MenuItem value="Customer">Customer</MenuItem>
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

    
      <Table className="user-table">
        <TableHead>
          <TableRow className="user-table-header">
            <TableCell>No</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Last Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedUsers.map(function fn(user, index)
          {
            const lastLoginDate = new Date(user.lastLogin);
            const relativeTime = formatDistanceToNow(lastLoginDate, { addSuffix: true });

            return(
              <TableRow key={user.id}>
                <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                <TableCell>{user.firstName + ' ' + user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{relativeTime}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditClick(user)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDeleteClick(user.id)}><Delete /></IconButton>
                </TableCell>
             </TableRow>
          );
          })}
        
        </TableBody>
      </Table>

      
      <div className="user-pagination">
        <div className="rows-info">
          Showing {(currentPage - 1) * pageSize + 1} - 
           {Math.min(currentPage * pageSize, filteredUsers.length)} of {filteredUsers.length} users
        </div>
        <div className="pagination-buttons">
          {Array.from({length: totalPages}, (_, i) => (
            <Button
              key={i + 1}
              size="small"
              variant={currentPage === i + 1 ? "contained" : "outlined"}
              onClick={() => setcurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;

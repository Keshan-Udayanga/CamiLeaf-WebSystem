import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AddUserForm.css';
import { useNavigate, useLocation } from 'react-router-dom';


const AddUserForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    role: '',
    status: '',
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location.state?.user){
      setFormData(location.state.user);
      setIsEditMode(true);
    }
  },[location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(isEditMode){
        const response = await axios.put(
          'http://localhost:8080/api/v1/user/edit/' + formData.id,
          formData
        );

        if(response.status === 200){
          alert('User updated successfully!');
          navigate('/admin/user-management');
        }
      }else{
      const response = await axios.post(
        'http://localhost:8080/api/v1/user/save',
        formData  // send plain user object
      );

      if (response.status === 200) {
        console.log('Submitting:', formData);

        alert('User added successfully!');
        setFormData({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          address: '',
          role: '',
          status: '',
        });

        navigate('/admin/user-management')
      }
    }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user.');
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>{isEditMode ? 'Update User' : 'Add New User'}</h2>

      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required readOnly={isEditMode}/>
      {!isEditMode && (
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      )}
      <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
      <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
      <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />

      <select name="role" value={formData.role} onChange={handleChange} required>
        <option value="" disabled>Select Role</option>
        <option value="Resource Manager">Resource Manager</option>
        <option value="Leaf Clerk">Leaf Clerk</option>
      </select>

      <select name="status" value={formData.status} onChange={handleChange} required>
        <option value="" disabled>Select Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <button  type="submit">{isEditMode ? 'Update' : 'Add User'}</button>
    </form>
  );
};

export default AddUserForm;

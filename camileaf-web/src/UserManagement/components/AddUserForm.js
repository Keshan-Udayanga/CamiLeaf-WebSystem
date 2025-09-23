import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AddUserForm.css';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../axiosConfig';


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
  const [formErrors, setFormErrors] = useState({});
  const isCustomer = formData.role === "Customer";
  

  useEffect(() => {
    if(location.state?.user){
      setFormData(location.state.user);
      setIsEditMode(true);
    }
  },[location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });

     if (name === "phoneNumber") {
    const numericValue = value.replace(/\D/g, '');

    setFormData({ ...formData, [name]: numericValue });

    if (numericValue.length !== 10) {
      setFormErrors((prev) => ({
        ...prev,
        phoneNumber: 'Phone number must be exactly 10 digits',
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        phoneNumber: '',
      }));
    }

    return;
  }
    
  }

  const validate = () => {
    const errors = {};
    const phoneRege = /^[0-9]{10}$/;
    
    if(!formData.email){
      errors.email = 'Emain is required';
    }else if(!formData.email.includes('@')){
      errors.email = 'Invalid Email format';
    }

    if(!isEditMode && !formData.password){
      errors.password = 'Password is required';
    }

    if(!formData.firstName.trim()){
      errors.firstName = 'First name is required';
    }
    
    if(!formData.lastName.trim()){
      errors.lastName = 'Last name is required';
    }

    if(!formData.phoneNumber){
      errors.phoneNumber = 'Phone number is required';
    }else if(!phoneRege.test(formData.phoneNumber)){
      errors.phoneNumber = 'Phone number must be 10 digits';
    }

    if(!formData.address.trim()){
      errors.address = 'Address is required';
    }

    if(!formData.role.trim()){
      errors.role = 'Please select a role';
    }

    if(!formData.status.trim()){
      errors.status = 'Please select a status';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validate()){
      return;
    }

    try {
      if(isEditMode){
        const response = await api.put(
          '/api/v1/user/edit/' + formData.id,
          formData
        );

        if(response.status === 200){
          alert('User updated successfully!');
          navigate('/admin/user-management');
        }
      }else{
      const response = await api.post(
        '/api/v1/user/save',
        formData  
      );

      if (response.status === 200) {

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

      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} readOnly={isEditMode}/>
      {formErrors.email && <span className="error">{formErrors.email}</span>}

      {!isEditMode && (
        <>
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}  readOnly={isCustomer}/>
      {formErrors.password && <span className="error">{formErrors.password}</span>}
      </>
      )}
      <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange}  readOnly={isCustomer}/>
      {formErrors.firstName && <span className="error">{formErrors.firstName}</span>}

      <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange}  readOnly={isCustomer}/>
      {formErrors.lastName && <span className="error">{formErrors.lastName}</span>}

      <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} maxLength={10}  readOnly={isCustomer}/>
      {formErrors.phoneNumber && <span className="error">{formErrors.phoneNumber}</span>}

      <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange}  readOnly={isCustomer}/>
      {formErrors.address && <span className="error">{formErrors.address}</span>}

      <select name="role" value={formData.role} onChange={handleChange} disabled={isCustomer}>
        <option value="" disabled>Select Role</option>
        <option value="Resource Manager">Resource Manager</option>
        <option value="Leaf Clerk">Leaf Clerk</option>
        
      </select>
      {formErrors.role && <span className="error">{formErrors.role}</span>}

      <select name="status" value={formData.status} onChange={handleChange} >
        <option value="" disabled>Select Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      {formErrors.status && <span className="error">{formErrors.status}</span>}

      <button  type="submit">{isEditMode ? 'Update' : 'Add User'}</button>
    </form>
  );
};

export default AddUserForm;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axiosConfig";
import "../styles/CustomerProfile.css";

const CustomerProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [customer, setCustomer] = useState({});
  const [passwords, setPasswords] = useState({ oldPass: "", newPass: "", confirmPass: "" });
  const [passError, setPassError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await api.get("/api/v1/user/me");
        setCustomer(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCustomer();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      await api.put(`/api/v1/user/edit/${customer.id}`, customer);
      setSuccessMsg("Profile updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePasswordChange = async () => {
    if (passwords.newPass !== passwords.confirmPass) {
      setPassError("Passwords do not match!");
      return;
    }
    try {
      await api.put(`/api/v1/user/change-password/${customer.id}`, passwords);
      alert("Password changed successfully!");
      setPasswords({ oldPass: "", newPass: "", confirmPass: "" });
      setPassError("");
    } catch (err) {
      console.error(err);
      setPassError("Failed to change password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/", { replace: true });
  };

  const handleBackToMain = () => {
    navigate("/");
  };

  return (
    <div className="customer-profile">
      <div className="profile-sidebar">
        <h3>{customer.firstName} {customer.lastName}</h3>
        <ul>
          <li onClick={() => setActiveTab("profile")} className={activeTab === "profile" ? "active" : ""}>Profile Info</li>
          <li onClick={() => setActiveTab("password")} className={activeTab === "password" ? "active" : ""}>Change Password</li>
          <li onClick={() => setActiveTab("orders")} className={activeTab === "orders" ? "active" : ""}>Order Summary</li>
        </ul>

        {/* Bottom Buttons */}
        <div className="sidebar-bottom">
          <button className="btn-back" onClick={handleBackToMain}>Back to Main</button>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="profile-content">
        {activeTab === "profile" && (
          <div className="tab-content">
            {successMsg && <p className="success-msg">{successMsg}</p>}
            <label>First Name:</label>
            <input name="firstName" value={customer.firstName || ""} onChange={handleProfileChange} />
            <label>Last Name:</label>
            <input name="lastName" value={customer.lastName || ""} onChange={handleProfileChange} />
            <label>Email:</label>
            <input name="email" value={customer.email || ""} disabled />
            <label>Phone:</label>
            <input name="phoneNumber" value={customer.phoneNumber || ""} onChange={handleProfileChange} disabled/>
            <label>Address:</label>
            <input name="address" value={customer.address || ""} onChange={handleProfileChange} />
            <label>Country:</label>
            <input name="country" value={customer.country || ""} disabled />

            <button onClick={handleSaveProfile}>Save Changes</button>
          </div>
        )}

        {activeTab === "password" && (
          <div className="tab-content">
            {passError && <p className="error-msg">{passError}</p>}
            <label>Old Password:</label>
            <input type="password" value={passwords.oldPass} onChange={e => setPasswords({...passwords, oldPass: e.target.value})} />
            <label>New Password:</label>
            <input type="password" value={passwords.newPass} onChange={e => setPasswords({...passwords, newPass: e.target.value})} />
            <label>Confirm Password:</label>
            <input type="password" value={passwords.confirmPass} onChange={e => setPasswords({...passwords, confirmPass: e.target.value})} />
            <button onClick={handlePasswordChange}>Change Password</button>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="tab-content">
            <p>Order history will be displayed here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerProfile;

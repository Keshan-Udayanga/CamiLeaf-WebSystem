// src/LoginPage.jsx
import React, { useState } from "react";
import "../styles/LoginPage.css";
import LoginImage from "../assests/teaLogin.jpg"
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function LoginPage() {
    const navigate = useNavigate();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:8081/api/auth/login",{
                email: email,
                password: password
            });

            const data = await response.data;
            
            localStorage.setItem("role", data.role);
            
            switch(data.role){
              case "ADMIN":
                    navigate("/admin");
                    break;
                case "LEAF CLERK":
                    navigate("/leafclerk");
                    break;
                case "RESOURCE MANAGER":
                    navigate("/resourcemanager");
                    break;
                case "CUSTOMER":
                    navigate("/customer");
                    break;
                default:
                    navigate("/login");
            }
        }catch(err){
            if (err.response && err.response.status === 401) {
        seterror("Invalid email or password");
      } else {
        seterror("Error occured");
      }

        }

    }


  return (
    <div className="login-wrapper">
      <div className="login-box">
        <div className="login-image">
          <img src={LoginImage} alt="Login illustration" />

        </div>

        <div className="login-form">
            <div className="form-headers">
                <h2>Welcome Back</h2>
                <p>Please sign in to continue</p>
            </div>
          
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)} 
              required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required />
            </div>

            <button type="submit" className="btn-login">Login</button>

            <p>
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "blue", textDecoration: "underline" }}>
                Sign Up
              </Link>
            </p>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

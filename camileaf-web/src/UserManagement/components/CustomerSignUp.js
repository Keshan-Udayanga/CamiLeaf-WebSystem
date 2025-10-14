import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { useNavigate } from 'react-router-dom';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import "react-phone-number-input/style.css";
import "../styles/CustomerSignUp.css";
import api from "../../axiosConfig";

const CustomerSignUp = () => {
    const [firstName, setFName] = useState("");
    const [lastName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [error, setError] = useState("");
    const [passerror, setPassError] = useState("");
    const [success, setSuccess] = useState("");
    const [phoneError, setPhoneError] = useState('');
    const navigate = useNavigate();

    countries.registerLocale(enLocale);

    
    const handlePhoneChange = (value) => {

        if(!value)
            return;

        const [countryCode, phoneNumber] = value.split(" ");
        
        const sanitizedPhoneNumber = phoneNumber ? phoneNumber.replace(/\D/g, '') : '';

        const phoneNumberObj = parsePhoneNumberFromString(value);
        if (phoneNumberObj && phoneNumberObj.isValid()) {
            const nationalNumberLength = phoneNumberObj.nationalNumber.length;
            const isoCode = phoneNumberObj.country;

            const countryName = isoCode ? countries.getName(isoCode, "en") : "";
            
            if (sanitizedPhoneNumber.length <= nationalNumberLength) {
                setPhone(`+${countryCode.replace('+', '')}${sanitizedPhoneNumber}`);
            }
            setPhoneError("");
            setCountry(countryName || "");
        } else {
            
            setPhoneError("Invalid phone number.");
        }

    };

    const handleFNameChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s'-]*$/.test(value)) {
            setFName(value);
        }
    };

    const handleLNameChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s'-]*$/.test(value)) {
            setLName(value);
        }
    };

    const handleAddressChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z0-9\s,.-]*$/.test(value)) {
            setAddress(value);
        }
    };



    
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        
        if (repassword && newPassword !== repassword) {
            setPassError("Passwords do not match");
        } else {
            setPassError("");
        }
    };


    const handleRePasswordChange = (e) => {
        const newRePassword = e.target.value;
        setRePassword(newRePassword);

        
        if (password && newRePassword !== password) {
            setPassError("Passwords do not match");
        } else {
            setPassError("");
        }
    };


    const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repassword) {
        setError("Passwords do not match.");
        return;
    }

    if (!email || !password || !phone || !address) {
        setError("Please fill in all fields.");
        return;
    }

    if (phoneError) {
        setError("Please correct phone number.");
        return;
    }

    try {
        const response = await api.post("/api/auth/signup", {
            email,
            password,
            firstName,
            lastName,
            phone,
            address,
            country
        });

        if (response.status === 200) {
            alert('Registered successfully!');
            navigate('/login');
        }
    } catch (err) {
        if (err.response?.data?.error) {
            setError(err.response.data.error);
        } else {
            setError("An error occurred during signup.");
        }
        setSuccess("");
    }
};


    return (
        <div className="SignUp-Body">
            <div className="form-container">
                

                <form onSubmit={handleSubmit}>
                    <h2 >Customer Signup</h2>

                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="name-container">
                        <div>
                            <label>First Name:</label>
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={handleFNameChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Last Name:</label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={handleLNameChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Re-enter Password:</label>
                        <input
                            type="password"
                            placeholder="Re-Enter your Password"
                            value={repassword}
                            onChange={handleRePasswordChange}
                            required
                        />
                    </div>
                    {passerror && <p style={{ color: 'red' }}>{passerror}</p>}

                    <div>
                        <label>Phone Number:</label>
                        <PhoneInput
                            international
                            defaultCountry="IN"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={handlePhoneChange}
                            required
                        />
                    </div>
                    {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}

                    <div>
                        <label>Address:</label>
                        <textarea
                            value={address}
                            onChange={handleAddressChange}
                            required
                            placeholder="Enter your delivery address"
                        />
                    </div>

                    <div>
                        <label>Country:</label>
                        <input
                            type="text"
                            value={country}
                            disabled
                            placeholder="Country will be auto-detected from phone number"
                        />
                    </div>
                    {error && <div style={{ color: "red" }}>{error}</div>}
                {success && <div style={{ color: "green" }}>{success}</div>}

                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default CustomerSignUp;

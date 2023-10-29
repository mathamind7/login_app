import React, { useState } from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Registration() {

    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address1: "",
        address2: "",
        number: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.password !== formData.cpassword) {
                setPasswordError("Passwords do not match");
            } else {
                setPasswordError("");
                const response = await fetch("/registration", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                  });          
                  if (response.status === 201) {
                    console.log("Registration successful");
                    navigate("/login");
                  } else {
                    console.error("Registration failed");
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return <div className="card">
        <form className="main-block" onSubmit={handleSubmit}>
            <div>
                <h1>Sign Up</h1>
            </div>
            <div className="name-block">
                <div>
                    <h2>First Name</h2>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        pattern="^\S+$"
                        required
                        onChange={handleInputChange}
                    ></input>
                </div>
                <div>
                    <h2>Last Name</h2>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        pattern="^\S+$"
                        required
                        onChange={handleInputChange}
                    ></input>
                </div>
            </div>
            <div className="details-block">
                <div className="address-block">
                    <h2>Address</h2>
                    <h2>Address Line 1</h2>
                    <input
                        type="text"
                        name="address1"
                        placeholder="Address Line 1"
                        required
                        onChange={handleInputChange}
                    ></input>
                    <h2>Address Line 2</h2>
                    <input
                        type="text"
                        name="address2"
                        placeholder="Address Line 2"
                        required
                        onChange={handleInputChange}
                    ></input>
                </div>
                <div>
                    <h2>Phone number</h2>
                    <input
                        type="tel"
                        name="number"
                        placeholder="Phone number"
                        pattern="^\S+$"
                        required
                        onChange={handleInputChange}
                    ></input>
                </div>

            </div>
            <div className="personal">
                <div>
                    <h2>Username</h2>
                    <input
                        type="email"
                        name="email"
                        placeholder="Username"
                        pattern="^\S+$"
                        onChange={handleInputChange}
                    ></input>
                </div>
                <div className="Password">
                    <h2>Create Password:</h2>
                    <input
                        type="password"
                        name="password"
                        placeholder="Create password"
                        pattern="^\S+$"
                        value={formData.password}
                        onChange={handleInputChange}
                    ></input>
                    <h2>Confirm Password:</h2>
                    <input
                        type="password"
                        name="cpassword"
                        placeholder="Confirm password"
                        pattern="^\S+$"
                        value={formData.cpassword}
                        onChange={handleInputChange}
                    ></input>
                </div>

            </div>
            <div className="submit">
                <button type="submit">Sign up</button>
            </div>
        </form>
        <div>
            <p>Already registered?<Link to="/login">Login</Link></p>
        </div>
        <div id="password-error" className="error-message">
            {passwordError}
        </div>
    </div>;
}

export default Registration;
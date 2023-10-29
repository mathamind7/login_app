import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch('/dashboard')
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    fetch('/dashboard', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setIsEditing(false);
      })
      .catch((error) => console.error('Error saving user data:', error));
  };
  
  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', { method: 'POST' });

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      {isEditing ? (
        <div>
          <h2>Edit Your Information:</h2>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Address 1:</label>
            <input
              type="text"
              name="address1"
              value={userData.address1}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Address 2:</label>
            <input
              type="text"
              name="address2"
              value={userData.address2}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="tel"
              name="number"
              value={userData.number}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h2>User Information:</h2>
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>Address 1: {userData.address1}</p>
          <p>Address 2: {userData.address2}</p>
          <p>Phone Number: {userData.number}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

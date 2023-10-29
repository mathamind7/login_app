import React, { useState, useEffect } from 'react';

function Admin() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/admin')
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;

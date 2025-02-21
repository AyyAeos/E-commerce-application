import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Backend API URL
  const API_URL = "http://localhost:8080/emps";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setError(""); // Reset error message
      const response = await axios.get(API_URL); // Fetch data from backend
      setUsers(response.data.data); // Assuming backend sends JSON array
    } catch (err) {
      setError("Failed to load user data. Please check the backend.");
      setUsers([]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User List</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Last Modified</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>{user.createTime}</td>
                <td>{user.lastUpdatedTime}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch users
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/users")
      .then((res) => {
        setUsers(res.data);
      });
  }, []);

  // Add user
  const addUser = () => {
    axios.post("http://127.0.0.1:5000/add-user", {
      name,
      email
    }).then(() => {
      alert("User Added");
      window.location.reload();
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>MySQL React Website</h1>

      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={addUser}>Add User</button>

      <hr />

      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
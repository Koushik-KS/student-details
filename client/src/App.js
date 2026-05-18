import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [usn, setUsn] = useState("");
  const [phone, setPhone] = useState("");

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
      email,
      usn,
      phone
    }).then(() => {

      alert("User Added");
      window.location.reload();

    });

  };

  // Delete user
  const deleteUser = (id) => {

    axios.delete(`http://127.0.0.1:5000/delete-user/${id}`)
      .then(() => {

        alert("User Deleted");
        window.location.reload();

      });

  };

  return (

    <div className="container">

      <h1>Student Details</h1>

      <input
        type="text"
        placeholder="Enter Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter USN"
        onChange={(e) => setUsn(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Phone Number"
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={addUser}>
        Submit
      </button>

      <hr />

      {users.map((user) => (

        <div className="user-card" key={user.id}>

          <h3>{user.name}</h3>

          <p>{user.email}</p>

           <p>{user.usn}</p>

          <p>{user.phone}</p>

          <button onClick={() => deleteUser(user.id)}>
            Delete
          </button>

        </div>

      ))}

    </div>

  );

}

export default App;
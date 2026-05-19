import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [usn, setUsn] = useState("");
  const [phone, setPhone] = useState("");

  const API = "https://student-details-lnga.onrender.com";

  // Fetch users
  const fetchUsers = () => {

    axios.get(`${API}/users`)
      .then((res) => {

        setUsers(res.data);

      })
      .catch((err) => {

        console.log(err);

      });

  };

  useEffect(() => {

    fetchUsers();

  }, []);

  // Add user
  const addUser = () => {

    axios.post(`${API}/add-user`, {

      name,
      email,
      usn,
      phone

    })
    .then(() => {

      alert("User Added");

      setName("");
      setEmail("");
      setUsn("");
      setPhone("");

      fetchUsers();

    })
    .catch((err) => {

      console.log(err);

    });

  };

  // Delete user
  const deleteUser = (id) => {

    axios.delete(`${API}/delete-user/${id}`)
      .then(() => {

        alert("User Deleted");

        fetchUsers();

      })
      .catch((err) => {

        console.log(err);

      });

  };

  return (

    <div className="container">

      <h1>Student Details</h1>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter USN"
        value={usn}
        onChange={(e) => setUsn(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phone}
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
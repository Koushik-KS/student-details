const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2006@Koushi",
  database: "mydb"
});

// Database connection
db.connect((err) => {

  if (err) {
    console.log("Database connection failed");
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }

});

// Home API
app.get("/", (req, res) => {

  res.send("Backend Running");

});

// Get all users
app.get("/users", (req, res) => {

  const sql = "SELECT * FROM users";

  db.query(sql, (err, result) => {

    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }

  });

});

// Add user
app.post("/add-user", (req, res) => {

  const { name, email, usn, phone } = req.body;

  const sql =
    "INSERT INTO users (name, email, usn, phone) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, usn, phone], (err, result) => {

    if (err) {
      res.send(err);
    } else {
      res.send("User Added");
    }

  });

});

// Delete user
app.delete("/delete-user/:id", (req, res) => {

  const id = req.params.id;

  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      res.send(err);
    } else {
      res.send("User Deleted");
    }

  });

});

// Start server
app.listen(5000, () => {

  console.log("Server running on port 5000");

});
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(express.json({ limit: "10mb" })); // This is used for body-parser
app.use(cors()); // This is used to enable CORS

// Create Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "buythebest",
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});

// Create DB
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE buythebest";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Database Created...");
  });
});

// Create Table
app.get("/createtable", (req, res) => {
  let sql =
    "CREATE TABLE users(id INT AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), address VARCHAR(255), phone INT(10), PRIMARY KEY (id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send("Users Table Created...");
  });
});

// Register
app.post("/register", (req, res) => {
  const { name, email, password, address, phone } = req.body;

  const user = {
    name,
    email,
    password,
    address,
    phone,
  };

  let sql = "INSERT INTO users SET ?";
  try {
    db.query(sql, user, (err, result) => {
      if (err) {
        throw err;
      }
      res.send({ user });
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Check Login
app.post("/auth", (req, res) => {
  const { email, password } = req.body;

  let sql = `SELECT * FROM users WHERE email = '${email}' AND  password = '${password}'`;
  console.log(sql);
  try {
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send({ user: result[0] });
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Listen
app.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));

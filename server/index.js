const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const pool = require("./config/db");

app.use(cors());
app.use(express.json());
console.log("Database:", process.env.DATABASE);
console.log("Password:", process.env.PASSWORD);

pool.query("SELECT NOW()", (error, result) => {
  if (error) {
    console.error("Database Connection Failed:", error.message);
  } else {
    console.log("Database Connected Successfully");
    console.log(result.rows[0]);
  }
});

app.get("/", (req, res) => {
  res.send("Server is running Successfully");
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Student Management API is Running",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
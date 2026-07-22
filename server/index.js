const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const pool = require("./config/db");
const authRoutes=require("./routes/authRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);


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
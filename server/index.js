const express = require("express");
const cors = require('cors');
require("dotenv").config();

const app =express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res) =>{
    res.send("Server is runing Sucessfully");
});

app.get("/api/health",(req,res)=>{
    res.json({
        success:true,
        message:" Student Management API is Running "
    })
})

const PORT = process.env.PORT || 10000;

app.listen(PORT,()=>{
    console.log(`Server is Runnig on Port ${PORT}`);
});
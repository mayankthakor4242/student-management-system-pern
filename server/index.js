const express = require("express");
const cors = require('cors');

const app =express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res) =>{
    res.send("Server is runing Sucessfully");
});

const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`Server is Runnig on Port ${PORT}`);
});
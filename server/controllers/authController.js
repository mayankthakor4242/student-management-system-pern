const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {createUser,findUserByEmail,}= require("../models/userModel");

const register = async ( req,res)=>{
    try{
        const {name,email,password,role}= req.body;

        const exitingUser = await findUserByEmail(email);
        if (exitingUser){
            return res.status(400).json({
                message:'Email Already Exitsts',
            })
        }
    
    const hasedPassword = await bcrypt.hash(password,10);
    const user = await createUser(
        name,email,hasedPassword,role || "student"
    );

    res.status(201).json({
        message:'User registered Successfully  ',
        user,
    })

    

    }catch(error){
        res.status(500).json({
            message:'Registration Failed ',
            error:error.message,
        })
    }

}

    const login = async ( req,res)=>{
        try{
            const {email,password}=req.body;
            const user = await findUserByEmail(email);

            if(!user){
                return res.status(401).json({
                    message:'Invalid Email or Password',
                })
            }
            const isPasswordValid = await bcrypt.compare(password,user.password)
            if(!isPasswordValid){
                return res.status(401).json({
                    message:'Invalid email or Password'
                })
            }
            const token = jwt.sign(
                {
                    id:user.id,
                    role:user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"1d",
                }
            );
            res.json({
                message:'Login Successfull ',
                token,
                user:{
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    role:user.role,
                },

            });
        }catch(error){
            res.status(500).json({
                message:'Login Failed',
                error:error.message,
            })
        }
    };
    module.exports ={
        register,
        login
    };
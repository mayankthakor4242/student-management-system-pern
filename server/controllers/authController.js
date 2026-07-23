
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    createUser,
    findUserByEmail
} = require("../models/userModel");

const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role
        } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        // Check if user already exists
        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                message: "Email Already Exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await createUser(
            name,
            email,
            hashedPassword,
            role || "student"
        );

        return res.status(201).json({
            message: "User Registered Successfully",
            user
        });

    } catch (error) {
        console.error("Registration Error:", error);

        return res.status(500).json({
            message: "Registration Failed",
            error: error.message
        });
    }
};


const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        // Validate fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.json({
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.status(500).json({
            message: "Login Failed",
            error: error.message
        });
    }
};


module.exports = {
    register,
    login
};


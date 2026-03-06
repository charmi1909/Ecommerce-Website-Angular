const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {User}=require('../Models/User');
const router=express.Router();
const app = express();
app.use(express.json());


const JWT_SECRET = "your_jwt_secret";




// Sign Up Route
router.post("/signup", async (req, res) => {
    try {
        const { name, email, passwordHash } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(passwordHash, 10);
        const newUser = new User({ name, email, passwordHash: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Sign In Route
router.post("/signin", async (req, res) => {
    try {
        const { email, passwordHash } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(passwordHash, user.passwordHash);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
        
        // Send only userId and token
        res.json({ userId: user._id, token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/reset-password", async (req, res) => {
    try {
        const { email, passwordHash } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const hashedPassword = await bcrypt.hash(passwordHash, 10);
        user.passwordHash = hashedPassword;
        await user.save();
        res.json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


module.exports=router;


const express = require("express");
const User = require("../models/User"); // Assuming User is a Mongoose model
const jwt = require("jsonwebtoken");
const zod = require("zod");

const router = express.Router();

// Token generation function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Request body validation schema using Zod
const authSchema = zod.object({
    username: zod.string().min(1, "Username is required"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
});

// Authentication route
router.post("/auth", async (req, res) => {
    try {
        // Validate the request body
        const result = authSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: result.error.errors });
        }

        const { username, password } = result.data;
        let user = await User.findOne({ username });

        if (user) {
            // If user exists, check the password
            if (!(await user.matchPassword(password))) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            // If user doesn't exist, create a new user
            user = new User({ username, password });
            await user.save();
            console.log("User added!");
        }

        // Generate token and set cookie
        const token = generateToken(user._id);
        res.cookie("token", token, { httpOnly: true });
        return res.json({ token, message: "Logged in successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

// Logout route
router.post("/logout", (req, res) => {
    res.clearCookie('token');
    res.json({ message: "Logged out" });
});

module.exports = router;

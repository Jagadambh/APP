const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

//  Connect to MongoDB
mongoose.connect("mongodb+srv://sonkarharish52584_db_user:Harish1919@cluster0.e2sbv4f.mongodb.net/poojaDB?retryWrites=true&w=majority").then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

//  User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

const User = mongoose.model("User", userSchema);

//  Signup Route
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.json({ message: "User registered successfully ✅" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//  Login Route
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found ❌" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password ❌" });
        }

        const token = jwt.sign(
            { id: user._id },
            "secretkey",
            { expiresIn: "1h" }
        );

        res.json({
            token,
            message: "Login successful ✅"
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//  Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000 🚀");
});
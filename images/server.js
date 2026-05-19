const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://sonkarharish52584_db_user:Harish1919@cluster0.e2sbv4f.mongodb.net/poojaDB?retryWrites=true&w=majority")
.then(() => {
    console.log("MongoDB Connected ✅");
})
.catch((err) => {
    console.log(err);
});

// Test Route
app.get("/", (req, res) => {
    res.send("API Working 🚀");
});

// Routes
app.use("/api/auth", require("./routes/auth"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
});
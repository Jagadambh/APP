const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Working 🚀");
});

// routes
app.use("/api/auth", require("./routes/auth"));

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
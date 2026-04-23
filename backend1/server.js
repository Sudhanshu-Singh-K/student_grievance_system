const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// mongoose.connect(process.env.MONGO_URI)
const connectDB = require("./config/db");

// call function
connectDB();
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const grievanceRoutes = require("./routes/grievance");
app.use("/api", grievanceRoutes);
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = require("./src/config/app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT;
connectDB();

// app.listen(PORT, () => {
//   console.log(`server is running on port ${PORT}`);
// });

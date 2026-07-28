const express = require("express");
const app = express();

require("dotenv").config();
const Port = process.env.PORT;

app.use(express.json());
const connectDB = require("./config/db");
connectDB();

const authRouter = require("./Routers/auth.routres");
app.use("/api/v1/auth", authRouter);

app.get("/api/v1", (req, res) => {
  res.status(200).json({
    Status_Code: 200,
    message: "Home",
  })
});

// app.listen(Port, () => {
//   console.log(`server is running on port ${Port}`);
// });


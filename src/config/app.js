const express = require("express");
const cors = require("cors");
const router = require("../routes/index.routes");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json());


app.use("/api/v1/", router);

app.get("/api/v1/", (req, res) => {
  res.json({
    message: "U connect can u catch all API endpoints?????",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "are u dumb",
  });
});

module.exports = app;

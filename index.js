const express = require("express");
const app = express();


require("dotenv").config();
const Port = process.env.PORT;


app.use(express.json());


app.listen(Port, () => {
  console.log(`server is running on port ${Port}`);
});


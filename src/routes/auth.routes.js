const express = require("express");
const router = express.Router();

const userLogin = require("../controller/auth/login");

router.post("/", userLogin);

module.exports = router;

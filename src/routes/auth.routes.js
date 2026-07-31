const express = require("express");
const router = express.Router();

const userLogin = require("../controller/auth/auth.controller");

router.post("/", userLogin);

module.exports = router;

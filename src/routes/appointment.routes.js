const express = require("express");
const router = express.Router();

const setAppointment = require("../controller/appointment/setAppointment.controller");
const getAllAppointments = require("../controller/appointment/getAppointment.controller");
const editAppointment = require("../controller/appointment/editAppointment.controller");

const checkToken = require("../middleware/checkToken");
const checkRole = require("../middleware/checkRole");

router.post("/", checkToken, checkRole("admin"), setAppointment);
router.get("/", checkToken, getAllAppointments);  
router.patch("/:id", checkToken, checkRole("admin"), editAppointment);

module.exports = router;
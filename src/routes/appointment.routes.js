const express = require("express");
const router = express.Router();

const setAppointment = require("../controller/appointment/setAppointment.controller");
const getAllAppointments = require("../controller/appointment/getAppointment.controller");
const editAppointment = require("../controller/appointment/editAppointment.controller");

router.post("/", setAppointment);
router.get("/", getAllAppointments);
router.patch("/:id", editAppointment);

module.exports = router;
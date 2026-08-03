const express = require("express");
const router = express.Router();

const setAppointment = require("../controller/appointment/setAppointment.controller");
const getAllAppointments = require("../controller/appointment/getAppointment.controller");
const editAppointment = require("../controller/appointment/editAppointment.controller");

const checkToken = require("../middleware/checkToken");
const checkReceptionist = require("../middleware/checkReceptionist");

router.post("/", checkToken, checkReceptionist, setAppointment);
router.get("/", checkToken, getAllAppointments);  // doctor also can view his/her appointments
router.patch("/:id", checkToken, checkReceptionist, editAppointment);

module.exports = router;
const express = require("express");
const router = express.Router();

const getAllPatients = require("../controller/patient/getAllPatients.controller");
const getPatientById = require("../controller/patient/getPatientById.controller");
const addPatient = require("../controller/patient/addPatient.controller");
const editPatient = require("../controller/patient/editPatient.controller");

const checkToken = require("../middleware/checkToken");
const checkRole = require("../middleware/checkRole");


router.get("/", checkToken, getAllPatients);
router.get("/:id", checkToken, getPatientById);
router.post("/", checkToken, checkRole("admin"), addPatient);
router.put("/:id", checkToken, checkRole("admin"), editPatient);


module.exports = router;
const express = require("express");
const router = express.Router();

const getAllPatients = require("../controller/patient/getAllPatients.controller");
const getPatientById = require("../controller/patient/getPatientById.controller");
const addPatient = require("../controller/patient/addPatient.controller");
const editPatient = require("../controller/patient/editPatient.controller");


router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.post("/", addPatient);
router.put("/:id", editPatient);


module.exports = router;
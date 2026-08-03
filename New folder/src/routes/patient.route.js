const express = require("express");
const router = express.Router();

const getAllPatients = require("../controller/patient/getAllPatients.controller");
const getPatientById = require("../controller/patient/getPatientById.controller");
const addPatient = require("../controller/patient/addPatient.controller");
const editPatient = require("../controller/patient/editPatient.controller");

const checkToken = require("../middleware/checkToken");
const checkReceptionist = require("../middleware/checkReceptionist");


router.get("/", checkToken, getAllPatients);
router.get("/:id", checkToken, getPatientById);
router.post("/", checkToken, checkReceptionist, addPatient);
router.put("/:id", checkToken, checkReceptionist, editPatient);


module.exports = router;
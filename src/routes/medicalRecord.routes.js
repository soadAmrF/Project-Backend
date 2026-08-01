const express = require("express");
const router = express.Router();

const createMedicalRecord = require("../controller/medicalRecord/createMedicalRecord");
const getMedicalRecord = require("../controller/medicalRecord/getMedicalRecord");
const getPatientMedicalRecords = require("../controller/medicalRecord/getPatientMedicalRecords");
const updateMedicalRecordNotes = require("../controller/medicalRecord/updateMedicalRecordNotes");
const deleteMedicalRecord = require("../controller/medicalRecord/deleteMedicalRecord");

const checkToken = require("../middleware/checkToken");

router.post("/", checkToken, createMedicalRecord);
router.get("/:id", checkToken, getMedicalRecord);
router.get("/pama/:id", checkToken, getPatientMedicalRecords);
router.patch("/:id", checkToken, updateMedicalRecordNotes);
router.delete("/:id", checkToken, deleteMedicalRecord);

module.exports = router;

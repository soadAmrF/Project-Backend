const express = require("express");
const router = express.Router();

const createMedicalRecord = require("../controller/medicalRecord/createMedicalRecord");
const getMedicalRecord = require("../controller/medicalRecord/getMedicalRecord");
const getPatientMedicalRecords = require("../controller/medicalRecord/getPatientMedicalRecords");
const updateMedicalRecordNotes = require("../controller/medicalRecord/updateMedicalRecordNotes");
const deleteMedicalRecord = require("../controller/medicalRecord/deleteMedicalRecord");

const checkToken = require("../middleware/checkToken");
const checkDoctor = require("../middleware/checkDoctor");

router.post("/", checkToken, checkDoctor, createMedicalRecord);
router.get("/:id", checkToken, checkDoctor, getMedicalRecord);
router.get("/pama/:id", checkToken,checkDoctor, getPatientMedicalRecords);
router.patch("/:id", checkToken, checkDoctor, updateMedicalRecordNotes);
router.delete("/:id", checkToken, checkDoctor, deleteMedicalRecord);

module.exports = router;

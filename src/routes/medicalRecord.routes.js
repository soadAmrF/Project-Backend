const express = require("express");
const router = express.Router();

const createMedicalRecord = require("../controller/medicalRecord/createMedicalRecord");
const getMedicalRecord = require("../controller/medicalRecord/getMedicalRecord");
const getPatientMedicalRecords = require("../controller/medicalRecord/getPatientMedicalRecords");
const updateMedicalRecordNotes = require("../controller/medicalRecord/updateMedicalRecordNotes");
const deleteMedicalRecord = require("../controller/medicalRecord/deleteMedicalRecord");

const checkToken = require("../middleware/checkToken");
const checkRole = require("../middleware/checkRole");

router.post("/", checkToken, checkRole("admin"), createMedicalRecord);
router.get("/:id", checkToken, checkRole("admin"), getMedicalRecord);
router.get("/pama/:id", checkToken,checkRole("admin"), getPatientMedicalRecords);
router.patch("/:id", checkToken, checkRole("admin"), updateMedicalRecordNotes);
router.delete("/:id", checkToken, checkRole("admin"), deleteMedicalRecord);

module.exports = router;

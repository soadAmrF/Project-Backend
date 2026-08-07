const express = require("express");
const router = express.Router();

const createMedicalRecord = require("../controller/medicalRecord/createMedicalRecord.controller");
const getMedicalRecord = require("../controller/medicalRecord/getMedicalRecord.controller");
const getPatientMedicalRecords = require("../controller/medicalRecord/getPatientMedicalRecords.controller");
const updateMedicalRecordNotes = require("../controller/medicalRecord/updateMedicalRecordNotes.controller");
const deleteMedicalRecord = require("../controller/medicalRecord/deleteMedicalRecord.controller");
const getAllMedicalRecords = require("../controller/medicalRecord/getAllMedicalRecords.controller");

const checkToken = require("../middleware/checkToken");
const checkRole = require("../middleware/checkRole");

router.post("/", checkToken, checkRole("admin"), createMedicalRecord);
router.get("/", checkToken, checkRole("admin"), getAllMedicalRecords);
router.get("/pama/:id", checkToken,checkRole("admin"), getPatientMedicalRecords);
router.get("/:id", checkToken, checkRole("admin"), getMedicalRecord);
router.patch("/:id", checkToken, checkRole("admin"), updateMedicalRecordNotes);
router.delete("/:id", checkToken, checkRole("admin"), deleteMedicalRecord);
router.get("/", checkToken, checkRole("admin"), getAllMedicalRecords);
module.exports = router;

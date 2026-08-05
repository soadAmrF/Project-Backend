const express = require("express");
const router = express.Router();

const getClinicInfo = require("../controller/clinicInfo/getClinicInfo.controller");
const updateClinicInfo = require("../controller/clinicInfo/updateClinicInfo.controller");
const createClinicInfo = require("../controller/clinicInfo/createClinicInfo.controller");

const checkRole = require("../middleware/checkRole");
const checkToken = require("../middleware/checkToken");


router.get("/", checkToken, getClinicInfo);
router.post("/", checkToken, checkRole("admin"), createClinicInfo);
router.put("/", checkToken, checkRole("admin"), updateClinicInfo);
router.patch("/", checkToken, checkRole("admin"), updateClinicInfo);

module.exports = router;

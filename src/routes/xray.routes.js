const express = require("express");
const createXray = require("../controller/Xray/createXray.controller");
const getAllXrays = require("../controller/Xray/getAllXrays.controller");
const getXrayById = require("../controller/Xray/getXrayById.controller");
const updateXray = require("../controller/Xray/updateXray.controller");
const deleteXray = require("../controller/Xray/deleteXray.controller");
const checkRole = require("../middleware/checkRole");
const checkToken = require("../middleware/checkToken");
const router = express.Router();

router.post("/:medicalRecordId", checkToken, checkRole("admin"), createXray);

router.get("/", checkToken, getAllXrays);

router.get("/:medicalRecordId/:xrayId", checkToken, getXrayById);

router.put(
  "/:medicalRecordId/:xrayId",
  checkToken,
  checkRole("admin"),
  updateXray,
);

router.delete(
  "/:medicalRecordId/:xrayId",
  checkToken,
  checkRole("admin"),
  deleteXray,
);

module.exports = router;

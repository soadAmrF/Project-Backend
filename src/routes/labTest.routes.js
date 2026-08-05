const express = require("express");
const router = express.Router();

const createLabTest = require("../controller/labTest/createLabTest.controller");
const getAllLabTests = require("../controller/labTest/getAllLabTests.controller");
const getLabTestById = require("../controller/labTest/getLabTestById.controller");
const updateLabTest = require("../controller/labTest/updateLabTest.controller");
const deleteLabTest = require("../controller/labTest/deleteLabTest.controller");

const checkRole = require("../middleware/checkRole");
const checkToken = require("../middleware/checkToken");

router.get("/", checkToken, getAllLabTests);
router.get("/:id", checkToken, getLabTestById);
router.post("/", checkToken, checkRole("admin"), createLabTest);
router.put("/:id", checkToken, checkRole("admin"), updateLabTest);
router.delete("/:id", checkToken, checkRole("admin"), deleteLabTest);

module.exports = router;

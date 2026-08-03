const express = require("express");
const router = express.Router();

const createLabTest = require("../controller/labTest/createLabTest.controller");
const getAllLabTests = require("../controller/labTest/getAllLabTests.controller");
const getLabTestById = require("../controller/labTest/getLabTestById.controller");
const updateLabTest = require("../controller/labTest/updateLabTest.controller");
const deleteLabTest = require("../controller/labTest/deleteLabTest.controller");

router.post("/", createLabTest);
router.get("/", getAllLabTests);
router.get("/:id", getLabTestById);
router.put("/:id", updateLabTest);
router.delete("/:id", deleteLabTest);

module.exports = router;

const express = require("express");
const router = express.Router();

const createLabOrder = require("../controller/labOrder/createLabOrder.controller");
const updateLabResult = require("../controller/labOrder/updateLabResult.controller");
const getPatientLabOrders = require("../controller/labOrder/getPatientLabOrders.controller");

router.post("/", createLabOrder);
router.get("/patient/:patientId", getPatientLabOrders);
router.put("/:orderId/tests/:testId/result", updateLabResult);

module.exports = router;

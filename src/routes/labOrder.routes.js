const express = require("express");
const router = express.Router();

const createLabOrder = require("../controller/labOrder/createLabOrder.controller");
const getAllLabOrders = require("../controller/labOrder/getAllLabOrders.controller");
const getLabOrderById = require("../controller/labOrder/getLabOrderById.controller");
const updateLabOrderStatus = require("../controller/labOrder/updateLabOrderStatus.controller");
const addTestResult = require("../controller/labOrder/addTestResult.controller");
const cancelLabOrder = require("../controller/labOrder/cancelLabOrder.controller");

const checkRole = require("../middleware/checkRole");
const checkToken = require("../middleware/checkToken");

router.post(
  "/",
  checkToken,
  checkRole("admin", "doctor", "receptionist"),
  createLabOrder,
);

router.get("/", checkToken, getAllLabOrders);
router.get("/:id", checkToken, getLabOrderById);

router.patch(
  "/:id/status",
  checkToken,
  checkRole("admin", "lab"),
  updateLabOrderStatus,
);
router.patch(
  "/:id/result",
  checkToken,
  checkRole("admin", "lab"),
  addTestResult,
);

router.patch(
  "/:id/cancel",
  checkToken,
  checkRole("admin", "doctor"),
  cancelLabOrder,
);

module.exports = router;

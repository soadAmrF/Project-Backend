const express = require("express");
const router = express.Router();

const createInventoryTransaction = require("../controller/inventoryTransaction/createInventoryTransaction");
const getAllInventoryTransactions = require("../controller/inventoryTransaction/getAllInventoryTransactions");
const getInventoryTransactionById = require("../controller/inventoryTransaction/getInventoryTransactionById");

const checkRole = require("../middleware/checkRole");
const checkToken = require("../middleware/checkToken");

router.post("/", checkToken, checkRole("admin"), createInventoryTransaction);
router.get("/", checkToken, checkRole("admin"), getAllInventoryTransactions);
router.get("/:id",checkToken, checkRole("admin"), getInventoryTransactionById);

module.exports = router;

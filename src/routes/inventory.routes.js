const express = require("express");
const router = express.Router();

const getAllInventory = require("../controller/Inventory/getAllInventory.controller");
const getInventoryById = require("../controller/Inventory/getInventoryById.controller");
const createInventory = require("../controller/Inventory/createInventory.controller");
const updateInventory = require("../controller/Inventory/updateInventory.controller");
const deleteInventory = require("../controller/Inventory/deleteInventory.controller");

router.get("/", getAllInventory);
router.get("/:id", getInventoryById);
router.post("/", createInventory);
router.patch("/:id", updateInventory);
router.delete("/:id", deleteInventory);

module.exports = router;

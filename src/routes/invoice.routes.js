const express = require("express");
const createInvoice = require("../controller/invoice/createInvoice.controller");
const getAllInvoices = require("../controller/invoice/getAllInvoices.controller");
const getInvoiceById = require("../controller/invoice/getInvoiceById.controller");
const checkToken = require("../middleware/checkToken");
const checkRole = require("../middleware/checkRole");
const updateInvoice = require("../controller/invoice/editInvoice.controller");
const cancelInvoice = require("../controller/invoice/cancelInvoice.controller");

const router = express.Router();

router.post("/", checkToken, checkRole("admin"), createInvoice);

router.get("/all", checkToken, checkRole("admin"), getAllInvoices);

router.get("/:id", checkToken, getInvoiceById);

router.put("/:id", checkToken, checkRole("admin"), updateInvoice);

router.patch("/:id/cancel", checkToken, cancelInvoice);

router.get("/", (req, res) => {
  res.send("Invoice route is working");
});

module.exports = router;

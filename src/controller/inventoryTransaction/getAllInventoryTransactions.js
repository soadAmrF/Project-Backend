const mongoose = require("mongoose");
const InventoryTransaction = require("../../models/inventoryTransaction.model");

const getAllInventoryTransactions = async (req, res) => {
  try {
    const { inventoryItemId, labOrderId, type, from, to } = req.query;

    const filter = {};

    if (inventoryItemId) {
      if (!mongoose.Types.ObjectId.isValid(inventoryItemId)) {
        return res.status(400).json({
          status: "fail",
          message: "Invalid inventoryItemId",
        });
      }

      filter.inventoryItemId = inventoryItemId;
    }

    if (labOrderId) {
      if (!mongoose.Types.ObjectId.isValid(labOrderId)) {
        return res.status(400).json({
          status: "fail",
          message: "Invalid labOrderId",
        });
      }

      filter.labOrderId = labOrderId;
    }

    if (type) {
      filter.type = type;
    }

    if (from || to) {
      filter.createdAt = {};

      if (from) {
        filter.createdAt.$gte = new Date(from);
      }

      if (to) {
        filter.createdAt.$lte = new Date(to);
      }
    }

    const transactions = await InventoryTransaction.find(filter)
      .populate("inventoryItemId", "name category unit quantity isActive")
      .populate("labOrderId", "orderStatus totalPrice")
      .populate("performedBy", "name fullname role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        status: "fail",
        message: "Invalid id format",
      });
    }

    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = getAllInventoryTransactions;

const mongoose = require("mongoose");
const InventoryTransaction = require("../../models/inventoryTransaction.model");

const getInventoryTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid id",
      });
    }

    const transaction = await InventoryTransaction.findById(id)
      .populate("inventoryItemId", "name category unit quantity isActive")
      .populate("labOrderId", "orderStatus totalPrice")
      .populate("performedBy", "name fullname role");

    if (!transaction) {
      return res.status(404).json({
        status: "fail",
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: transaction,
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

module.exports = getInventoryTransactionById;

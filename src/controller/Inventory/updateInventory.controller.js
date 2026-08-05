const mongoose = require("mongoose");
const Inventory = require("../../models/inventory.model");

const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid id",
      });
    }

    const allowedFields = [
      "name",
      "category",
      "unit",
      "quantity",
      "reorderLevel",
      "costPrice",
      "expiryDate",
      "isActive",
    ];

    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "No valid fields to update",
      });
    }

    const item = await Inventory.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({
        status: "fail",
        message: "Item not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: item,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = updateInventory;

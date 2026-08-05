const mongoose = require("mongoose");
const Inventory = require("../../models/inventory.model");

const getInventoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid id",
      });
    }

    const item = await Inventory.findById(id);

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
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = getInventoryById;

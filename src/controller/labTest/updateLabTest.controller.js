const mongoose = require("mongoose");
const LabTest = require("../../models/labTest.model");

const updateLabTest = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "fail", message: "Invalid id" });
    }

    const allowedFields = [
      "name",
      "code",
      "category",
      "price",
      "normalRange",
      "unit",
      "preparationInstructions",
      "requiredSupplies",
      "isActive",
    ];

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const test = await LabTest.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate("requiredSupplies.inventoryItemId", "name unit");

    if (!test) {
      return res
        .status(404)
        .json({ status: "fail", message: "Lab test not found" });
    }

    return res.status(200).json({ status: "success", data: test });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = updateLabTest;

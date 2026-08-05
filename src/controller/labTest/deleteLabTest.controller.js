const mongoose = require("mongoose");
const LabTest = require("../../models/labTest.model");

const deleteLabTest = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "fail", message: "Invalid id" });
    }

    const test = await LabTest.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );

    if (!test) {
      return res
        .status(404)
        .json({ status: "fail", message: "Lab test not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Lab test deactivated successfully",
      data: test,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = deleteLabTest;

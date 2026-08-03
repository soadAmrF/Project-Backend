const LabOrder = require("../../models/labOrder.model");

const updateLabResult = async (req, res) => {
  try {
    const { orderId, testId } = req.params;
    const { value, unit, isNormal, notes } = req.body;

    const labOrder = await LabOrder.findById(orderId);
    if (!labOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Lab order not found" });
    }

    const testItem = labOrder.tests.id(testId);
    if (!testItem) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found in this order" });
    }

    testItem.result = { value, unit, isNormal, notes };
    testItem.status = "completed";

    const allCompleted = labOrder.tests.every(
      (t) => t.status === "completed" || t.status === "cancelled",
    );
    if (allCompleted) {
      labOrder.orderStatus = "completed";
    }

    await labOrder.save();

    res.status(200).json({
      success: true,
      message: "Lab result updated successfully",
      data: labOrder,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = updateLabResult;

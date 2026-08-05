const mongoose = require("mongoose");
const LabOrder = require("../../models/labOrder.model");

const addTestResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { testIndex, result } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "fail", message: "Invalid id" });
    }

    if (testIndex === undefined) {
      throw new Error("testIndex is required");
    }

    const order = await LabOrder.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ status: "fail", message: "Lab order not found" });
    }

    if (testIndex < 0 || testIndex >= order.tests.length) {
      throw new Error("Invalid test index");
    }

    
    order.tests[testIndex].result = {
      value: result.value,
      unit: result.unit || order.tests[testIndex].result?.unit,
      isNormal: result.isNormal,
      notes: result.notes,
    };
    order.tests[testIndex].status = "completed";

    
    order.technicianId = req.user._id;

    
    const allCompleted = order.tests.every((t) => t.status === "completed");
    if (allCompleted) order.orderStatus = "completed";
    else order.orderStatus = "in-progress";

    await order.save();

    const populated = await order
      .populate("patientId", "fullName phone")
      .populate("doctorId", "specialization")
      .populate("technicianId", "name fullname")
      .populate("tests.labTestId", "name code normalRange");

    return res.status(200).json({ status: "success", data: populated });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = addTestResult;

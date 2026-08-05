const mongoose = require("mongoose");
const LabOrder = require("../../models/labOrder.model");

const updateLabOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, testIndex, testStatus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "fail", message: "Invalid id" });
    }

    const order = await LabOrder.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ status: "fail", message: "Lab order not found" });
    }

    
    if (testIndex !== undefined && testStatus) {
      if (testIndex < 0 || testIndex >= order.tests.length) {
        throw new Error("Invalid test index");
      }
      order.tests[testIndex].status = testStatus;

      
      const allCompleted = order.tests.every((t) => t.status === "completed");
      const anyInProgress = order.tests.some(
        (t) => t.status === "in-progress" || t.status === "completed",
      );

      if (allCompleted) order.orderStatus = "completed";
      else if (anyInProgress) order.orderStatus = "in-progress";
    }

    
    if (orderStatus) {
      order.orderStatus = orderStatus;
    }

    
    order.technicianId = req.user._id;

    await order.save();

    const populated = await order
      .populate("patientId", "fullName phone")
      .populate("doctorId", "specialization")
      .populate("technicianId", "name fullname")
      .populate("tests.labTestId", "name code");

    return res.status(200).json({ status: "success", data: populated });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = updateLabOrderStatus;

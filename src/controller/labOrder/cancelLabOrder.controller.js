const mongoose = require("mongoose");
const LabOrder = require("../../models/labOrder.model");

const cancelLabOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "fail", message: "Invalid id" });
    }

    const order = await LabOrder.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ status: "fail", message: "Lab order not found" });
    }

    
    if (order.orderStatus === "completed") {
      throw new Error("Cannot cancel a completed order");
    }

    
    if (
      req.user.role === "doctor" &&
      String(order.doctorId._id || order.doctorId) !== String(req.user._id)
    ) {
      return res.status(403).json({
        status: "fail",
        message: "You can only cancel your own orders",
      });
    }

    order.orderStatus = "cancelled";
    order.tests.forEach((test) => {
      test.status = "cancelled";
    });
    if (reason) {
      order.doctorNotes =
        `${order.doctorNotes || ""}\n[Cancelled] ${reason}`.trim();
    }

    await order.save();

    return res.status(200).json({
      status: "success",
      message: "Lab order cancelled successfully",
      data: order,
    });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = cancelLabOrder;

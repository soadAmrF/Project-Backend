const mongoose = require("mongoose");
const LabOrder = require("../../models/labOrder.model");

const getLabOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "fail", message: "Invalid id" });
    }

    const order = await LabOrder.findById(id)
      .populate("patientId", "fullName phone gender bloodGroup medicalNotes")
      .populate("doctorId")
      .populate("medicalRecordId", "chiefComplaint diagnosis prescription")
      .populate("technicianId", "name fullname")
      .populate(
        "tests.labTestId",
        "name code normalRange unit preparationInstructions",
      );

    if (!order) {
      return res
        .status(404)
        .json({ status: "fail", message: "Lab order not found" });
    }

    
    if (
      req.user.role === "doctor" &&
      String(order.doctorId._id || order.doctorId) !== String(req.user._id)
    ) {
      return res.status(403).json({
        status: "fail",
        message: "You can only view your own orders",
      });
    }

    return res.status(200).json({ status: "success", data: order });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = getLabOrderById;

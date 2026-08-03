const LabOrder = require("../../models/labOrder.model");
const Patient = require("../../models/patient.model");

const getPatientLabOrders = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    const orders = await LabOrder.find({ patientId })
      .populate({
        path: "doctorId",
        select: "specialization",
        populate: { path: "userId", select: "fullName" },
      })
      .populate("tests.labTestId", "name category normalRange unit")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = getPatientLabOrders;

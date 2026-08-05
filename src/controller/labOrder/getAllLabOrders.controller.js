const LabOrder = require("../../models/labOrder.model");

const getAllLabOrders = async (req, res) => {
  try {
    const { status, patientId, dateFrom, dateTo } = req.query;
    const filter = {};

    
    if (req.user.role === "doctor") {
      
      filter.doctorId = req.user._id;
    } else if (req.user.role === "lab") {
      
      filter.orderStatus = { $in: ["pending", "in-progress"] };
    }
    

    if (status) filter.orderStatus = status;
    if (patientId) filter.patientId = patientId;

    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
      if (dateTo) filter.createdAt.$lte = new Date(dateTo);
    }

    const orders = await LabOrder.find(filter)
      .populate("patientId", "fullName phone gender")
      .populate("doctorId", "specialization")
      .populate("technicianId", "name fullname")
      .populate("tests.labTestId", "name code")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = getAllLabOrders;

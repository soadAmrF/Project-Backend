const Appointment = require("../../models/appointment.model");

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ التحقق من صحة الـ ID
    if (!id || id.length !== 24) {
      return res.status(400).json({
        STATUS_CODE: 400,
        success: false,
        message: "Invalid appointment ID",
      });
    }

    // 2️⃣ البحث عن الموعد
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        STATUS_CODE: 404,
        success: false,
        message: "Appointment not found",
      });
    }

    // 3️⃣ (اختياري) منع حذف المواعيد المكتملة
    if (appointment.status === "completed") {
      return res.status(400).json({
        STATUS_CODE: 400,
        success: false,
        message: "Cannot delete a completed appointment",
      });
    }

    // 4️⃣ حذف الموعد
    await Appointment.findByIdAndDelete(id);

    return res.status(200).json({
      STATUS_CODE: 200,
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting appointment:", err);

    if (err.name === "CastError") {
      return res.status(400).json({
        STATUS_CODE: 400,
        success: false,
        message: "Invalid appointment ID format",
      });
    }

    return res.status(500).json({
      STATUS_CODE: 500,
      success: false,
      message: err.message,
    });
  }
};

module.exports = deleteAppointment;

const MedicalRecord = require("../../models/medicalRecord.model");

const getMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const medicalRecord = await MedicalRecord.findById(id)
      .populate("patientId", "fullName phone")
      .populate({
        path: "doctorId",
        select: "specialization",
        populate: { path: "userId", select: "fullName" },
      })
      .populate("appointmentId", "dateAndTime status"); 

    if (!medicalRecord || medicalRecord.isDeleted) {
      return res
        .status(404)
        .json({ success: false, message: "Medical record not found" });
    }

    res.status(200).json({ success: true, data: medicalRecord });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = getMedicalRecord;

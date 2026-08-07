const MedicalRecord = require("../../models/medicalRecord.model");

const getMedicalRecords = async (req, res) => {
  try {
    const medicalRecords = await MedicalRecord.find({ isDeleted: false })
      .populate("patientId", "fullName phone")
      .populate({
        path: "doctorId",
        select: "specialization",
        populate: {
          path: "userId",
          select: "fullName",
        },
      })
      .populate("appointmentId", "dateAndTime status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: medicalRecords.length,
      data: medicalRecords,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = getMedicalRecords;
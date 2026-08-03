const MedicalRecord = require("../../models/medicalRecord.model");
// const Patient = require("../../models/patient.model");

const getPatientMedicalRecords = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });
    }

    const records = await MedicalRecord.find({ patientId})
      .populate({
        path: "doctorId",
        select: "specialization",
        populate: { path: "userId", select: "fullname" },
      })
      .populate("appointmentId", "date time")
      

    res
      .status(200)
      .json({ success: true, count: records.length, data: records });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = getPatientMedicalRecords;

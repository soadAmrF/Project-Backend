const MedicalRecord = require("../../models/medicalRecord.model");
//const Patient = require("../../models/patient.model");
const Doctor = require("../../models/doctor.model");
//const Appointment = require("../../models/appointment.model");

const createMedicalRecord = async (req, res) => {
    try {
        const {
          patientId,
          doctorId,
          appointmentId,
          chiefComplaint,
          diagnosis,
          treatmentPlan,
          notes,
          nextVisit,
        } = req.body;

        if (!patientId) {
          return res.status(400).json({
            success: false,
            message: "Patient ID is required",
          });
        }
        if (!doctorId) {
            return res.status(400).json({
                success: false,
                message: "Doctor ID is required",
            });
        }
        if (!appointmentId) {
            return res.status(400).json({
                success: false,
                message: "Appointment ID is required",
            });
        }
        if (!chiefComplaint) {
            return res.status(400).json({
                success: false,
                message: "Chief Complaint is required",
            });
        }
        if (!diagnosis) {
            return res.status(400).json({
                success: false,
                message: "Diagnosis is required",
            });
        }
        if (!treatmentPlan) {
            return res.status(400).json({
                success: false,
                message: "Treatment Plan is required",
            });
        }

         const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: "Patient not found" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }


    const medicalRecord = await MedicalRecord.create({
      patientId,
      doctorId,
      appointmentId,
      chiefComplaint,
      diagnosis,
      treatmentPlan,
      notes,
      nextVisit,
    });

    appointment.status = "Completed";
    await appointment.save();

    res.status(201).json({
      success: true,
      message: "Medical record created successfully",
      data: medicalRecord,
    });} catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = createMedicalRecord;

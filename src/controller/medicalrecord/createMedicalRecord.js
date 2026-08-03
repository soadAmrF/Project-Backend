const MedicalRecord = require("../../models/medicalRecord.model");
const Patient = require("../../models/patient.model"); 
const Doctor = require("../../models/doctor.model");
const Appointment = require("../../models/appointment.model"); 

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
      prescription, 
    } = req.body;

   
    if (
      !patientId ||
      !doctorId ||
      !appointmentId ||
      !chiefComplaint ||
      !diagnosis
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const patient = await Patient.findById(patientId);
    if (!patient)
      return res
        .status(404)
        .json({ success: false, message: "Patient not found" });

    const doctor = await Doctor.findById(doctorId);
    if (!doctor)
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment)
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });

    const medicalRecord = await MedicalRecord.create({
      patientId,
      doctorId,
      appointmentId,
      chiefComplaint,
      diagnosis,
      treatmentPlan,
      notes,
      nextVisit,
      prescription: prescription || [], 
    });

    appointment.status = "completed"; 
    await appointment.save();

    res.status(201).json({
      success: true,
      message: "Medical record created successfully",
      data: medicalRecord,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = createMedicalRecord;

const MedicalRecord = require("../../models/medicalRecord.model");

const updateMedicalRecordNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes, treatmentPlan, prescription } = req.body; 

    const medicalRecord = await MedicalRecord.findById(id);
    if (!medicalRecord) {
      return res
        .status(404)
        .json({ success: false, message: "Medical record not found" });
    }

    if (notes !== undefined) medicalRecord.notes = notes;
    if (treatmentPlan !== undefined)
      medicalRecord.treatmentPlan = treatmentPlan;
    if (prescription !== undefined) medicalRecord.prescription = prescription;

    await medicalRecord.save();

    res.status(200).json({
      success: true,
      message: "Medical record updated successfully",
      data: medicalRecord,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = updateMedicalRecordNotes;

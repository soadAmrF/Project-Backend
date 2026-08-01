const MedicalRecord = require("../../models/medicalRecord.model");

const deleteMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const medicalRecord = await MedicalRecord.findById(id);
    if (!medicalRecord) {
      return res
        .status(404)
        .json({ success: false, message: "Medical record not found" });
    }

    if (medicalRecord.isDeleted) {
      return res
        .status(400)
        .json({ success: false, message: "Medical record already deleted" });
    }

    medicalRecord.isDeleted = true;
    await medicalRecord.save();

    res
      .status(200)
      .json({ success: true, message: "Medical record deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = deleteMedicalRecord;

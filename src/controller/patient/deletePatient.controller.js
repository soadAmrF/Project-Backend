const Patient = require("../../models/patient.model");

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    
    if (!id || id.length !== 24) {
      return res.status(400).json({
        STATUS_CODE: 400,
        success: false,
        message: "Invalid patient ID!",
      });
    }

    
    const patient = await Patient.findById(id);

    if (!patient) {
      return res.status(404).json({
        STATUS_CODE: 404,
        success: false,
        message: "Patient not found!",
      });
    }

    
    await Patient.findByIdAndDelete(id);

    return res.status(200).json({
      STATUS_CODE: 200,
      success: true,
      message: "Patient deleted successfully!",
    });
  } catch (err) {
    console.error("Error deleting patient:", err);

    if (err.name === "CastError") {
      return res.status(400).json({
        STATUS_CODE: 400,
        success: false,
        message: "Invalid patient ID format!",
      });
    }

    return res.status(500).json({
      STATUS_CODE: 500,
      success: false,
      message: err.message,
    });
  }
};

module.exports = deletePatient;

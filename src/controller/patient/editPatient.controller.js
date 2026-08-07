const Patient = require("../../models/patient.model");

const editPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, gender, phone, bloodGroup, medicalNotes } = req.body;

    
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

    
    if (phone && phone !== patient.phone) {
      const phoneRegex = /^01[0-9]{9}$/;
      if (!phoneRegex.test(String(phone))) {
        return res.status(400).json({
          STATUS_CODE: 400,
          success: false,
          message: "Please enter a valid Egyptian phone number (01xxxxxxxxx)!",
        });
      }

      const checkPhone = await Patient.findOne({
        phone: String(phone),
        _id: { $ne: id },
      });

      if (checkPhone) {
        return res.status(409).json({
          STATUS_CODE: 409,
          success: false,
          message: "This phone number is already used by another patient!",
        });
      }
    }

    
    if (bloodGroup !== undefined && bloodGroup !== "") {
      const validBloodGroups = [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ];
      if (!validBloodGroups.includes(bloodGroup)) {
        return res.status(400).json({
          STATUS_CODE: 400,
          success: false,
          message: "Invalid blood group!",
        });
      }
    }

    
    if (fullName !== undefined) patient.fullName = fullName;
    if (gender !== undefined) patient.gender = gender;
    if (phone !== undefined) patient.phone = String(phone);
    if (bloodGroup !== undefined) patient.bloodGroup = bloodGroup;
    if (medicalNotes !== undefined) patient.medicalNotes = medicalNotes;

    await patient.save();

    return res.status(200).json({
      STATUS_CODE: 200,
      success: true,
      message: "Patient updated successfully!",
      data: patient,
    });
  } catch (err) {
    console.error("Error updating patient:", err);

    if (err.name === "CastError") {
      return res.status(400).json({
        STATUS_CODE: 400,
        success: false,
        message: "Invalid patient ID format!",
      });
    }

    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        STATUS_CODE: 400,
        success: false,
        message: messages.join(", "),
      });
    }

    if (err.code === 11000) {
      return res.status(409).json({
        STATUS_CODE: 409,
        success: false,
        message: "This phone number is already used by another patient!",
      });
    }

    return res.status(500).json({
      STATUS_CODE: 500,
      success: false,
      message: err.message,
    });
  }
};

module.exports = editPatient;

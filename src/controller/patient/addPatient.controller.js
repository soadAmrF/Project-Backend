const Patient = require("../../models/patient.model");

const addPatient = async (req, res) => {
  try {
    const { fullName, gender, phone, bloodGroup, medicalNotes } = req.body;

    
    if (!fullName || !gender || !phone) {
      return res.status(400).json({
        STATUS_CODE: 400,
        success: false,
        message: "Full name, gender and phone are required!",
      });
    }

    
    const phoneRegex = /^01[0-9]{9}$/;
    if (!phoneRegex.test(String(phone))) {
      return res.status(400).json({
        STATUS_CODE: 400,
        success: false,
        message: "Please enter a valid Egyptian phone number (01xxxxxxxxx)!",
      });
    }

    
    const checkPatient = await Patient.findOne({ phone: String(phone) });

    if (checkPatient) {
      return res.status(409).json({
        STATUS_CODE: 409,
        success: false,
        message: "A patient with this phone number already exists!",
      });
    }

    
    const validBloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    if (bloodGroup && !validBloodGroups.includes(bloodGroup)) {
      return res.status(400).json({
        STATUS_CODE: 400,
        success: false,
        message: "Invalid blood group!",
      });
    }

    
    const createPatient = await Patient.create({
      fullName,
      gender,
      phone: String(phone),
      bloodGroup: bloodGroup || "",
      medicalNotes: medicalNotes || "",
    });

    return res.status(201).json({
      STATUS_CODE: 201,
      success: true,
      message: "Patient added successfully!",
      data: createPatient,
    });
  } catch (err) {
    console.error("Error adding patient:", err);

    
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
        message: "A patient with this phone number already exists!",
      });
    }

    return res.status(500).json({
      STATUS_CODE: 500,
      success: false,
      message: err.message,
    });
  }
};

module.exports = addPatient;

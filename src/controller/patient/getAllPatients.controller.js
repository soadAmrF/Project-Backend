const Patient = require("../../models/patient.model");

const getAllPatients = async (req, res) => {
  try {
    
    const { search, gender, bloodGroup, page = 1, limit = 100 } = req.query;

    
    const filter = {};

    
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    
    if (gender) {
      filter.gender = gender;
    }

    
    if (bloodGroup) {
      filter.bloodGroup = bloodGroup;
    }

    
    const skip = (page - 1) * limit;

    const [patients, total] = await Promise.all([
      Patient.find(filter)
        .select("fullName gender phone bloodGroup medicalNotes createdAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Patient.countDocuments(filter),
    ]);

    return res.status(200).json({
      STATUS_CODE: 200,
      success: true,
      message: "Patients retrieved successfully!",
      count: patients.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: patients,
    });
  } catch (err) {
    console.error("Error fetching patients:", err);

    return res.status(500).json({
      STATUS_CODE: 500,
      success: false,
      message: err.message,
    });
  }
};

module.exports = getAllPatients;

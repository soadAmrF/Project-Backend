const Doctor = require("../../models/doctor.model");

const createDoctor = async (req, res) => {
  try {
    const {
      userId,
      specialtyId,
      experienceYears,
      bio,
      phone,
      specialization,
      address,
    } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }
    if (!specialtyId) {
      return res
        .status(400)
        .json({ success: false, message: "Specialty ID is required" });
    }
    if (experienceYears === undefined || experienceYears === null) {
      return res
        .status(400)
        .json({ success: false, message: "Experience years is required" });
    }
    if (!bio) {
      return res
        .status(400)
        .json({ success: false, message: "Bio is required" });
    }
    if (!phone) {
      return res
        .status(400)
        .json({ success: false, message: "Phone is required" });
    }
    if (!specialization) {
      return res
        .status(400)
        .json({ success: false, message: "Specialization is required" });
    }
    if (!address) {
      return res
        .status(400)
        .json({ success: false, message: "Address is required" });
    }

    const doctor = await Doctor.create({
      userId,
      specialtyId,
      experienceYears,
      bio,
      phone,
      specialization,
      address,
    });

    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = {
  createDoctor
}
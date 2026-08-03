const Doctor = require("../../models/doctor.model");
const User = require("../../models/user.model");

const createDoctor = async (req, res) => {
  try {
    const {
      userId,
      experienceYears,
      bio,
      specialization,
      degree,
      fees,
      workingDays,
      workingHours,
      address,
    } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "doctor") {
      return res.status(400).json({
        success: false,
        message: "User role must be doctor",
      });
    }

    const existingDoctor = await Doctor.findOne({ userId });

    if (existingDoctor) {
      return res.status(409).json({
        success: false,
        message: "Doctor profile already exists for this user",
      });
    }

    if (!experienceYears) {
      return res.status(400).json({
        success: false,
        message: "Experience years is required",
      });
    }

    if (!bio) {
      return res.status(400).json({
        success: false,
        message: "Bio is required",
      });
    }

    if (!specialization) {
      return res.status(400).json({
        success: false,
        message: "Specialization is required",
      });
    }

    if (!fees ) {
      return res.status(400).json({
        success: false,
        message: "Fees is required",
      });
    }

    if (!workingDays )
    {
      return res.status(400).json({
        success: false,
        message: "Working days are required",
      });
    }

    if (!workingHours || !workingHours.start || !workingHours.end) {
      return res.status(400).json({
        success: false,
        message: "Working hours are required",
      });
    }

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    const doctor = await Doctor.create({
      userId,
      experienceYears,
      bio,
      specialization,
      degree,
      fees,
      workingDays,
      workingHours,
      address,
    });

    res.status(201).json({
      success: true,
      message: "Doctor created successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  createDoctor,
};

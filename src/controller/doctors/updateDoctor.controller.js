const Doctor = require("../../models/doctor.model");

const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.userId) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Cannot change the assigned User ID.",
        });
    }

    const doctor = await Doctor.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("userId", "name")
      .populate("specialtyId", "name");

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Doctor updated successfully",
        data: doctor,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = {updateDoctor};
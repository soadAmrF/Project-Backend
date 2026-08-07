const Doctor = require("../../models/doctor.model");

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("userId", "fullname name  phone");      

    res
      .status(200)
      .json({ success: true, count: doctors.length, data: doctors });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = {
  getAllDoctors
};
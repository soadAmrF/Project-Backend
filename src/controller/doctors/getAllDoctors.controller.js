const Doctor = require("../../models/doctor.model");

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("userId", "name phone");
<<<<<<< HEAD
      //.populate("specialtyId", "name");
=======
>>>>>>> 03b461e4e0204498f2f8f0dc651a28573d1747fa
      

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
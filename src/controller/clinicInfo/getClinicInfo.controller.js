const ClinicInfo = require("../../models/clinicInfo.model");

const getClinicInfo = async (req, res) => {
  try {
    const info = await ClinicInfo.findOne();

    if (!info) {
      return res.status(404).json({
        status: "fail",
        message: "Clinic info not found. Please add it first.",
      });
    }

    return res.status(200).json({
      status: "success",
      data: info,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = getClinicInfo;

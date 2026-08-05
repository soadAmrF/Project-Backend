const ClinicInfo = require("../../models/clinicInfo.model");

const createClinicInfo = async (req, res) => {
  try {
    const existing = await ClinicInfo.findOne();
    if (existing) {
      return res.status(400).json({
        status: "fail",
        message: "Clinic info already exists. Use update instead.",
      });
    }

    const info = await ClinicInfo.create(req.body);

    return res.status(201).json({
      status: "success",
      data: info,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = createClinicInfo;

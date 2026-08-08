const medicalRecord = require("../../models/medicalRecord.model");
const response = require("../../helpers/response");

const getAllXrays = async (req, res) => {
  try {
    const records = await medicalRecord.find({ "X_Ray.0": { $exists: true } });

    return res.status(200).json({
      STATUS_CODE: 200,
      message: "get All X-rays successfully",
      data: records,
    });
  } catch (err) {
    return res.status(500).json(response(500, err.message));
  }
};

module.exports = getAllXrays;

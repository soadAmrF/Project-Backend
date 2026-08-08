const medicalRecord = require("../../models/medicalRecord.model");
const response = require("../../helpers/response");

const getXrayById = async (req, res) => {
  try {
    const { medicalRecordId, xrayId } = req.params;
    const record = await medicalRecord.findOne(
      { _id: medicalRecordId, "X_Ray._id": xrayId },
      { "X_Ray.$": 1 },
    );
    if (!record) {
      return res.status(404).json(response(404, "X-ray not found"));
    }
    res.status(200).json({
      STATUS_CODE: 200,
      message: "GetX-ray successfully",
      data: record.X_Ray[0],
    });
  } catch (err) {
    res.status(500).json(response(500, err.message));
  }
};

module.exports = getXrayById;

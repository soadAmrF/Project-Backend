const medicalRecord = require("../../models/medicalRecord.model");
const response = require("../../helpers/response");

const deleteXray = async (req, res) => {
  try {
    const { medicalRecordId, xrayId } = req.params;

    const record = await medicalRecord.findByIdAndUpdate(
      medicalRecordId,
      { $pull: { X_Ray: { _id: xrayId } } },
      { new: true },
    );

    if (!record) {
      return res.status(404).json(response(404, "Medical record not found"));
    }

    return res
      .status(200)
      .json(response(200, "X-ray deleted successfully", record));
  } catch (err) {
    return res.status(500).json(response(500, err.message));
  }
};

module.exports = deleteXray;

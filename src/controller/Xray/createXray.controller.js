const medicalRecord = require("../../models/medicalRecord.model");
const response = require("../../helpers/response");

const createXray = async (req, res) => {
  try {
    const { xrayType, price, notes, result, image, status } = req.body;

    // if (!xrayType || !price || !notes || !result || !status) {
    //   return res.status(400).json(response(400, "All fields are required"));
    // }

    const { medicalRecordId } = req.params;

    const record = await medicalRecord.findByIdAndUpdate(
      medicalRecordId,
      { $push: { X_Ray: { xrayType, price, notes, result, image, status } } },
      { new: true },
    );

    if (!record) {
      return res.status(404).json(response(404, "Medical record not found"));
    }

    res.status(201).json(response(201, "X-ray created successfully", record));
  } catch (err) {
    res.status(500).json(response(500, err.message));
  }
};

module.exports = createXray;

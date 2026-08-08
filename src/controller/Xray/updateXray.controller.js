const medicalRecord = require("../../models/medicalRecord.model");
const response = require("../../helpers/response");

const updateXray = async (req, res) => {
  try {
    const { medicalRecordId, xrayId } = req.params;

    const record = await medicalRecord.findOneAndUpdate(
      { _id: medicalRecordId, "X_Ray._id": xrayId },
      {
        $set: {
          "X_Ray.$.xrayType": req.body.xrayType,
          "X_Ray.$.price": req.body.price,
          "X_Ray.$.notes": req.body.notes,
          "X_Ray.$.result": req.body.result,
          "X_Ray.$.image": req.body.image,
          "X_Ray.$.status": req.body.status,
        },
      },
      { new: true },
    );

    if (!record) {
      return res
        .status(404)
        .json(response(404, "X-ray or Medical record not found"));
    }

    return res
      .status(200)
      .json(response(200, "X-ray updated successfully", record));
  } catch (err) {
    return res.status(500).json(response(500, err.message));
  }
};

module.exports = updateXray;

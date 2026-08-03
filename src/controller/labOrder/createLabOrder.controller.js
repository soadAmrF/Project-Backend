const LabOrder = require("../../models/labOrder.model");

const createLabOrder = async (req, res) => {
  try {
    const { patientId, doctorId, medicalRecordId, tests, doctorNotes } =
      req.body;

    if (
      !patientId ||
      !doctorId ||
      !medicalRecordId ||
      !tests ||
      !Array.isArray(tests) ||
      tests.length === 0
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Missing required fields or empty tests array",
        });
    }

    const totalPrice = tests.reduce((sum, test) => sum + (test.price || 0), 0);

    const newLabOrder = await LabOrder.create({
      patientId,
      doctorId,
      medicalRecordId,
      tests,
      totalPrice,
      doctorNotes,
    });

    res.status(201).json({
      success: true,
      message: "Lab order created successfully",
      data: newLabOrder,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = createLabOrder;

const LabTest = require("../../models/labTest.model");

const getLabTestById = async (req, res) => {
  try {
    const { id } = req.params;

    const labTest = await LabTest.findById(id);
    if (!labTest) {
      return res
        .status(404)
        .json({ success: false, message: "Lab test not found" });
    }

    res.status(200).json({ success: true, data: labTest });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = getLabTestById;

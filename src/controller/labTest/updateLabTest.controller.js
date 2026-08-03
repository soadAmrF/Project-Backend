const LabTest = require("../../models/labTest.model");

const updateLabTest = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, category, price, normalRange, unit, isActive } =
      req.body;

    const labTest = await LabTest.findById(id);
    if (!labTest) {
      return res
        .status(404)
        .json({ success: false, message: "Lab test not found" });
    }

    if (name && name !== labTest.name) {
      const existing = await LabTest.findOne({ name });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Lab test with this name already exists",
        });
      }
      labTest.name = name;
    }

    if (code && code !== labTest.code) {
      const existing = await LabTest.findOne({ code });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Lab test with this code already exists",
        });
      }
      labTest.code = code;
    }

    if (category !== undefined) labTest.category = category;
    if (price !== undefined) labTest.price = price;
    if (normalRange !== undefined) labTest.normalRange = normalRange;
    if (unit !== undefined) labTest.unit = unit;
    if (isActive !== undefined) labTest.isActive = isActive;

    await labTest.save();

    res.status(200).json({
      success: true,
      message: "Lab test updated successfully",
      data: labTest,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = updateLabTest;

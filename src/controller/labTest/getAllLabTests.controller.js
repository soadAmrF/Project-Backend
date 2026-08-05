const LabTest = require("../../models/labTest.model");

const getAllLabTests = async (req, res) => {
  try {
    const { category, search, activeOnly } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (activeOnly === "true") filter.isActive = true;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { code: { $regex: search, $options: "i" } },
      ];
    }

    const tests = await LabTest.find(filter)
      .populate("requiredSupplies.inventoryItemId", "name unit")
      .sort({ name: 1 });

    return res.status(200).json({
      status: "success",
      count: tests.length,
      data: tests,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = getAllLabTests;

const LabTest = require("../../models/labTest.model");

const getAllLabTests = async (req, res) => {
  try {
    const { category, search } = req.query;

    const filter = { isActive: true };

    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { code: { $regex: search, $options: "i" } },
      ];
    }

    const labTests = await LabTest.find(filter).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: labTests.length,
      data: labTests,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = getAllLabTests;

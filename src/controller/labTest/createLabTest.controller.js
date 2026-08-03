const LabTest = require("../../models/labTest.model");

const createLabTest = async (req, res) => {
  try {
    const { name, code, category, price, normalRange, unit } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }
    
    if (!code) {
        return res.status(400).json({
            success: false,
            message: "Code is required",
        });
    }
    if (!category) {
        return res.status(400).json({
            success: false,
            message: "Category is required",
        });
    }
    if (!price) {
        return res.status(400).json({
            success: false,
            message: "Price is required",
        });
    }

    const existingTest = await LabTest.findOne({
      $or: [{ name }, { code }],
    });
    if (existingTest) {
      return res.status(400).json({
        success: false,
        message: "Lab test with this name or code already exists",
      });
    }

    const labTest = await LabTest.create({
      name,
      code,
      category,
      price,
      normalRange,
      unit,
    });

    res.status(201).json({
      success: true,
      message: "Lab test created successfully",
      data: labTest,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = createLabTest;

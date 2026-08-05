const LabTest = require("../../models/labTest.model");

const createLabTest = async (req, res) => {
  try {
    const {
      name,
      code,
      category,
      price,
      normalRange,
      unit,
      preparationInstructions,
      requiredSupplies,
      isActive,
    } = req.body;

   if (!name) {
     throw new Error("Name is required");
   }

   if (!code) {
     throw new Error("Code is required");
   }

   if (!category) {
     throw new Error("Category is required");
   }

   if (price === undefined) {
     throw new Error("Price is required");
   }

    const existing = await LabTest.findOne({
      $or: [{ name }, { code }],
    });

    if (existing) {
      throw new Error("Lab test with this name or code already exists");
    }

    const labTest = await LabTest.create({
      name,
      code,
      category,
      price,
      normalRange,
      unit,
      preparationInstructions,
      requiredSupplies: requiredSupplies || [],
      isActive: isActive !== undefined ? isActive : true,
    });

    return res.status(201).json({
      status: "success",
      data: labTest,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = createLabTest;

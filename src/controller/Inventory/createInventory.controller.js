const Inventory = require("../../models/inventory.model");

const createInventory = async (req, res) => {
  try {
    const {
      name,
      category,
      unit,
      quantity,
      reorderLevel,
      costPrice,
      expiryDate,
      isActive,
    } = req.body;

if (!name) {
  return res.status(400).json({
    status: "fail",
    message: "Name is required",
  });
}

if (!category) {
  return res.status(400).json({
    status: "fail",
    message: "Category is required",
  });
}

if (!unit) {
  return res.status(400).json({
    status: "fail",
    message: "Unit is required",
  });
}

if (costPrice === undefined) {
  return res.status(400).json({
    status: "fail",
    message: "Cost price is required",
  });
}

    const item = await Inventory.create({
      name,
      category,
      unit,
      quantity,
      reorderLevel,
      costPrice,
      expiryDate,
      isActive,
    });

    return res.status(201).json({
      status: "success",
      data: item,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = createInventory;

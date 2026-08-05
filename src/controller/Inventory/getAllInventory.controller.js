const Inventory = require("../../models/inventory.model");

const getAllInventory = async (req, res) => {
  try {
    const { category, search, lowStock, expired, isActive } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (isActive === "true") {
      filter.isActive = true;
    }

    if (isActive === "false") {
      filter.isActive = false;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (lowStock === "true") {
      filter.$expr = { $lte: ["$quantity", "$reorderLevel"] };
    }

    if (expired === "true") {
      filter.expiryDate = { $lte: new Date() };
    }

    const items = await Inventory.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      count: items.length,
      data: items,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = getAllInventory;

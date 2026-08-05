const mongoose = require("mongoose");
const Inventory = require("../../models/inventory.model");
const InventoryTransaction = require("../../models/inventoryTransaction.model");

const createInventoryTransaction = async (req, res) => {
   console.log("🔍 req.user:", req.user);
   console.log("🔍 Authorization header:", req.headers.authorization);
    const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const {
      inventoryItemId,
      type,
      quantity,
      quantityAfter,
      notes,
      labOrderId,
    } = req.body;

    
    const performedBy = req.user?._id || req.user?.id;

    if (!performedBy) {
      throw new Error("User not authenticated");
    }

    
    if (!inventoryItemId || !type || quantity === undefined) {
      throw new Error("inventoryItemId, type and quantity are required");
    }

    
    if (!mongoose.Types.ObjectId.isValid(inventoryItemId)) {
      throw new Error("Invalid inventoryItemId");
    }

    
    const inventoryItem =
      await Inventory.findById(inventoryItemId).session(session);

    if (!inventoryItem) {
      throw new Error("Inventory item not found");
    }

    if (!inventoryItem.isActive) {
      throw new Error("Inventory item is not active");
    }

    const quantityBefore = inventoryItem.quantity;
    let newQuantity = quantityBefore;

    
    if (type === "in") {
      if (quantity <= 0) {
        throw new Error(
          "Quantity must be greater than 0 for 'in' transactions",
        );
      }
      newQuantity = quantityBefore + quantity;
    } else if (type === "out" || type === "expired") {
      if (quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
      }
      if (quantity > quantityBefore) {
        throw new Error(`Insufficient quantity. Available: ${quantityBefore}`);
      }
      newQuantity = quantityBefore - quantity;
    } else if (type === "adjustment") {
      if (quantityAfter === undefined || quantityAfter < 0) {
        throw new Error("quantityAfter must be 0 or greater for adjustment");
      }
      newQuantity = quantityAfter;
    } else {
      throw new Error("Invalid transaction type");
    }

    
    const transaction = await InventoryTransaction.create(
      [
        {
          inventoryItemId,
          type,
          quantity,
          quantityBefore,
          quantityAfter: newQuantity,
          notes,
          performedBy,
          labOrderId,
        },
      ],
      { session },
    );

    
    await Inventory.findByIdAndUpdate(
      inventoryItemId,
      { quantity: newQuantity },
      { session },
    );

    await session.commitTransaction();

    
    const populatedTransaction = await InventoryTransaction.findById(
      transaction[0]._id,
    )
      .populate("inventoryItemId", "name unit")
      .populate("performedBy", "name fullname")
      .populate("labOrderId");

    return res.status(201).json({
      status: "success",
      data: populatedTransaction,
    });
  } catch (error) {
    await session.abortTransaction();

    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  } finally {
    session.endSession();
  }
};

module.exports = createInventoryTransaction;

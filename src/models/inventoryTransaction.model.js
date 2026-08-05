const mongoose = require("mongoose");

const inventoryTransactionSchema = new mongoose.Schema(
  {
    inventoryItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },

    
    type: {
      type: String,
      required: true,
      enum: ["in", "out", "adjustment", "expired"],
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    quantityBefore: {
      type: Number,
      min: 0,
    },

    quantityAfter: {
      type: Number,
      min: 0,
    },

    labOrderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabOrder",
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

inventoryTransactionSchema.index({ inventoryItemId: 1, createdAt: -1 });
inventoryTransactionSchema.index({ labOrderId: 1 });

module.exports = mongoose.model(
  "InventoryTransaction",
  inventoryTransactionSchema,
);

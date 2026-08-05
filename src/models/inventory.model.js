const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    unit: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    reorderLevel: {
      type: Number,
      required: true,
      min: 0,
      default: 10,
    },

    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    expiryDate: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

inventorySchema.index({ name: 1 });
inventorySchema.index({ category: 1 });

module.exports = mongoose.model("Inventory", inventorySchema);

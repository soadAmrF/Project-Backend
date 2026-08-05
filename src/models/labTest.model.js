const mongoose = require("mongoose");

const labTestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    normalRange: {
      type: String,
    },
    unit: {
      type: String,
    },
    
    preparationInstructions: {
      type: String,
      trim: true,
    },
    
    requiredSupplies: [
      {
        inventoryItemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Inventory",
          required: true,
        },
        quantityNeeded: {
          type: Number,
          required: true,
          min: 0.01, 
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("LabTest", labTestSchema);

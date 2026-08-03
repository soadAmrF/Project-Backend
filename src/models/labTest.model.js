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
      enum: ["blood", "urine", "stool", "hormones", "imaging", "other"],
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
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("LabTest", labTestSchema);

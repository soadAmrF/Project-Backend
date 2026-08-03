const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    experienceYears: {
      type: Number,
      required: true,
      min: 0,
    },
    bio: {
      type: String,
      required: true,
      maxlength: 500,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    degree: {
      type: String,
      trim: true,
    },
    fees: {
      type: Number,
      required: true,
      min: 0,
    },
    workingDays: {
      type: [String],
      enum: [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      default: [],
    },
    workingHours: {
      start: String,
      end: String,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    // isActive: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Doctor", doctorSchema);

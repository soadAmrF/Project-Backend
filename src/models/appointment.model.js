const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient is required"],
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor is required"],
    },
    dateAndTime: {
      type: Date,
      required: [true, "Date and time are required"],
    },
    reason: {
      type: String,
      trim: true,
      maxLength: [500, "Reason cannot exceed 500 characters"], 
      default: "",
    },
    status: {
      type: String,
      enum: {
        values: [
          "scheduled",
          "in-progress",
          "completed",
          "cancelled",
          "missed",
        ], 
        message: "Invalid status value",
      },
      default: "scheduled",
    },
  },
  {
    timestamps: true,
  },
);


appointmentSchema.index({ doctorId: 1, dateAndTime: 1 });
appointmentSchema.index({ patientId: 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ dateAndTime: -1 });

module.exports = mongoose.model("Appointment", appointmentSchema);

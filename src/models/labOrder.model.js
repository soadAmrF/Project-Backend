const mongoose = require("mongoose");

const labOrderSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    medicalRecordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicalRecord",
      required: true,
    },
    technicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tests: [
      {
        labTestId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "LabTest",
          required: true,
        },
        testName: { type: String, required: true },
        price: { type: Number, required: true },
        result: {
          value: { type: String },
          unit: { type: String },
          isNormal: { type: Boolean },
          notes: { type: String },
        },
        status: {
          type: String,
          enum: ["pending", "in-progress", "completed", "cancelled"],
          default: "pending",
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "in-progress", "completed", "cancelled"],
      default: "pending",
    },
    doctorNotes: {
      type: String,
    },
  },
  { timestamps: true },
);

labOrderSchema.index({ patientId: 1, createdAt: -1 });
labOrderSchema.index({ doctorId: 1, createdAt: -1 });

module.exports = mongoose.model("LabOrder", labOrderSchema);

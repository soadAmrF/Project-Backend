const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema(
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
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    chiefComplaint: {
      type: String,
      required: true,
      maxLength: 500,
    },
    diagnosis: {
      type: String,
      required: true,
      maxLength: 500,
    },

    prescription: [
      {
        medicineName: {
          type: String,
          required: true,
          trim: true,
        },
        dosage: {
          type: String,
          required: true,
          trim: true,
        },
        duration: {
          type: String,
          required: true,
          trim: true,
        },
        instructions: {
          type: String,
          trim: true,
        },
      },
    ],

    treatmentPlan: {
      type: String,
      maxLength: 1000,
    },
    notes: {
      type: String,
      maxLength: 1000,
    },
    nextVisit: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    X_Ray: [
      {
        xrayType: {
          type: String,
          required: true,
          trim: true,
        },
        image: {
          type: String,
        },
        status: {
          type: String,
          enum: ["Pending", "Completed", "Cancelled"],
          default: "Pending",
          required: true,
        },
        notes: {
          type: String,
          maxLength: 1000,
        },
        price: {
          type: Number,
          min: 0,
        },
        result: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

medicalRecordSchema.index({ patientId: 1, createdAt: -1 });

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);

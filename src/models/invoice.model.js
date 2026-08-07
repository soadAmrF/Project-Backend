const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
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
    services: [
      {
        serviceName: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    patientStatus: {
      type: String,

      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "unpaid", "cancelled"],
      default: "paid",
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cash", "creditCard"],
      default: "cash",
    },
    invoiceNumber: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Invoice", invoiceSchema);

const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxLength: [100, "Full name cannot exceed 100 characters"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: ["male", "female"],
        message: "Gender must be either 'male' or 'female'",
      },
    },
    phone: {
      type: String, 
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      match: [/^01[0-9]{9}$/, "Please enter a valid Egyptian phone number"],
      
      
    },
    bloodGroup: {
      type: String, 
      trim: true,
      uppercase: true,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", ""],
        message: "Invalid blood group",
      },
      default: "", 
    },
    medicalNotes: {
      type: String, 
      trim: true,
      maxLength: [1000, "Medical notes cannot exceed 1000 characters"],
      default: "",
    },
  },
  {
    timestamps: true, 
  },
);


patientSchema.index({ fullName: "text", phone: 1 });

module.exports = mongoose.model("Patient", patientSchema);

const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, 
  specialtyId: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "Specialty",
    required: true,
  },
  experienceYears: {
    type: Number,
    required: true,
  },bio: {
    type: String,
    required: true,
  },phone: {
    type: String,
    required: true,
  },specialization: {
    type: String,
    required: true,
  },address: {
    type: String,
    required: true,
  },    
  isActive: {
    type: Boolean,
    default: true,
  }
  }, {
    timestamps: true,
  });

module.exports = mongoose.model("Doctor", doctorSchema);

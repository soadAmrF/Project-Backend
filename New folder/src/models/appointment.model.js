const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
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
    dateAndTime: {
        type: Date,
        required: true,
    },
    reason: {
        type: String,
        maxLength: 30,
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled', 'missed'],
        default: 'scheduled'
    }
    
},{timestamps: true}
);
module.exports = mongoose.model("Appointment", appointmentSchema);


const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
        fullName: {
            type: String,
            required: true,
            
            maxLength: 30
        },
        gender: {
            type: String,
            required: true,
            enum: ['male', 'female'],
        },
        phone: {
            type: Number,
            required: true,
            unique: true,
        },
        bloodGroup: {
            type: String,
            maxLenght: 3,
        },
        medicalNotes: {
            type: String,
            maxLenght: 50
        }
        
    },{timestamps: true}
);
module.exports = mongoose.model("Patient", patientSchema);
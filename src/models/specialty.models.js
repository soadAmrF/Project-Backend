const mongoose = require('mongoose');


// what can me do in hear idk

const specialtySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true}
    
},
    {
        timestamps: true,
    }
);

const Specialty = mongoose.model('Specialty', specialtySchema);

module.exports = Specialty;
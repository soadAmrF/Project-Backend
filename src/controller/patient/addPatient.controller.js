const Patient = require("../../models/patient.model");

const addPatient = async (req, res) => {

    try {
        const {
            fullName, gender, phone, bloodGroup, medicalNotes
        } = req.body;

        if(!fullName || !gender || !phone){
            return res.status(400).json({
                STATUS_CODE: 400,
                message: "All fields required!",
            });
        }

        const checkPatient = await Patient.findOne({phone});

        if(checkPatient){
            return res.status(400).json({
                STATUS_CODE: 400,
                message: "Patient is already exists!",
            });
        };

        const createPatient = await Patient.create({
            fullName,
            gender,
            phone,
            bloodGroup, 
            medicalNotes,
        });
        
        return res.status(201).json({
            STATUS_CODE: 201,
            message: "Patient added successfully!",
        });

    } catch(err){
        
        return res.status(500).json({
            STATUS_CODE: 500,
            message: err.message,
        });
    };
};
module.exports = addPatient;
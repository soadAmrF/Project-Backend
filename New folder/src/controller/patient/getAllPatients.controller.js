const Patient = require("../../models/patient.model");

const getAllPatients = async (req, res) => {

    try{
        const patients = await Patient.find({},
            'fullName gender phone bloodGroup medicalNotes'
        );
        
        return res.status(200).json({
            STATUS_CODE: 200,
            message: "patients retrieved successfully!",
            data: patients
        });
        
    } catch(err){

        return res.status(500).json({
            STATUS_CODE: 500,
            message: err.message,
        });
    }

};
module.exports = getAllPatients;
const Patient = require("../../models/patient.model");

const getPatientById = async (req, res) => {

    try{
        const patientId = req.params.id;

        const getPatient = await Patient.findById(
            patientId,'fullName gender phone bloodGroup medicalNotes'
        );

        if (!getPatient) {
            return res.status(404).json({
                STATUS_CODE: 404,
                message: "Patient not found!",
            });
        }

        return res.status(200).json({
            STATUS_CODE: 200,
            message: "Patient retrieved successfully!",
            data: getPatient
        });

    } catch(err){
        
        if (err.name === "CastError") {
            return res.status(400).json({
                STATUS_CODE: 400,
                message: "Invalid patient ID!",
            });
        }

        return res.status(500).json({
            STATUS_CODE: 500,
            message: err.message,
        });
    }
};
module.exports = getPatientById;
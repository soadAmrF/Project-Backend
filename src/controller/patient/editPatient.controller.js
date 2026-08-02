const Patient = require("../../models/patient.model");

const editPatient = async (req, res) => {

    try {

        const patientId = req.params.id;
        const {phone, medicalNotes} = req.body;

        if (phone) {

            const checkPhone = await Patient.findOne({
                phone,
                _id: { $ne: patientId }
            });

            if (checkPhone) {
                return res.status(409).json({
                    STATUS_CODE: 409,
                    message: "Phone number already exists!",
                });
            }
        }

        const updatePatient = await Patient.findByIdAndUpdate(
            patientId,
            {
                phone,
                medicalNotes
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatePatient) {
            return res.status(404).json({
                STATUS_CODE: 404,
                message: "Update error!",
            });
        }

        return res.status(200).json({
            STATUS_CODE: 200,
            message: "Patient updated successfully!",
            data: updatePatient,
        });

    } catch (err) {

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

module.exports = editPatient;
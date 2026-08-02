const Appointment = require('../../models/appointment.model');
const Patient = require('../../models/patient.model');
const Doctor = require('../../models/doctor.model');

const setAppointment = async (req, res) => {
    try{
        
        const {
            patientId,
            doctorId,
            dateAndTime,
            reason,
            status
        } = req.body;

        if(!patientId || !doctorId || !dateAndTime){
            return res.status(400).json({
                STATUS_CODE: 400,
                message: "All fields required!",
            });
        }

        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(401).json({
                STATUS_CODE: 401,
                message: "Patient is not found!",
            });
        }

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(401).json({
                STATUS_CODE: 401,
                message: "Doctor is not found!",
            });
        }

        const checkAppointment = await Appointment.findOne({
            doctorId,
            dateAndTime
        });

        if (checkAppointment) {
            return res.status(409).json({
                STATUS_CODE: 409,
                message: "Doctor already has an appointment at this time."
            });
        }

        const createAppointment = await Appointment.create({
            patientId,
            doctorId,
            dateAndTime,
            reason,
            status
        });

        return res.status(201).json({
            STATUS_CODE: 201,
            message: "Appointment Created successfully",
            data: createAppointment
        });

    } catch (err){
        return res.status(500).json({
            STATUS_CODE: 500,
            message: err.message,
        });
    }
};
module.exports = setAppointment;
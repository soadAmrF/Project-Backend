const Appointment = require('../../models/appointment.model');

const editAppointment = async (req, res) => {
    try{
        const appointmentId = req.params.id;
        const {dateAndTime, status} = req.body;

        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({
                STATUS_CODE: 404,
                message: "Appointment not found!."
            });
        }

        if (dateAndTime) {
            const checkAppointment = await Appointment.findOne({
                doctorId: appointment.doctorId,
                dateAndTime,
                _id: { $ne: appointmentId },
            });

            if (checkAppointment) {
                return res.status(409).json({
                    STATUS_CODE: 409,
                    message: "Doctor already has an appointment at this time.",
                });
            }
        }

        const updateAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        return res.status(200).json({
            STATUS_CODE: 200,
            message: "Appointment updated successfully.",
            data: updateAppointment
        });

    } catch (err){
        if (err.name === "CastError") {
            return res.status(400).json({
                STATUS_CODE: 400,
                message: "Invalid appointment ID!",
            });
        }

        return res.status(500).json({
            STATUS_CODE: 500,
            message: err.message,
        });
    }
};
module.exports = editAppointment;
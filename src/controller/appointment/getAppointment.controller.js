const Appointment = require("../../models/appointment.model");

const getAllAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "fullName phone")
      .populate({
        path: "doctorId",
        select: "specialization fees userId",
        populate: {
          path: "userId",
          select: "fullname phone",
        },
      });

    const data = appointments.map((appointment) => ({
      id: appointment._id,
      patientId: appointment.patientId?._id,
      doctorId: appointment.doctorId?._id,
      patientName: appointment.patientId?.fullName,
      doctorName: appointment.doctorId.userId?.fullname,
      phone: appointment.doctorId.userId?.phone,
      dateAndTime: appointment.dateAndTime,
      reason: appointment.reason,
      status: appointment.status,
    }));

    console.log(appointments);

    return res.status(200).json({
      STATUS_CODE: 200,
      message: "Appointments retrieved successfully",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      STATUS_CODE: 500,
      message: err.message,
    });
  }
};
module.exports = getAllAppointment;

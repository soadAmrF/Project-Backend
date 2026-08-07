const Appointment = require("../../models/appointment.model");

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "fullName name phone") // أضفنا phone للمريض
      .populate({
        path: "doctorId",
        select: "specialization fees userId name",
        populate: {
          path: "userId",
          select: "fullname phone",
        },
      })
      .sort({ dateAndTime: -1 });

    const data = appointments.map((appointment) => {
      const app = appointment.toObject();

      const patientName =
        app.patientId?.fullName || app.patientId?.name || "مريض محذوف";
      const patientPhone = app.patientId?.phone || "-";

      let doctorName = "طبيب محذوف";
      let doctorPhone = "-";

      if (app.doctorId) {
        if (app.doctorId.userId) {
          doctorName =
            app.doctorId.userId.fullname || app.doctorId.userId.name || "طبيب";
          doctorPhone = app.doctorId.userId.phone || "-";
        } else {
          doctorName = app.doctorId.name || "طبيب";
        }
      }

      return {
        id: app._id,
        patientId: app.patientId?._id || null,
        doctorId: app.doctorId?._id || null,
        patientName: patientName,
        doctorName: doctorName,
        phone: patientPhone, 
        doctorPhone: doctorPhone, 
        dateAndTime: app.dateAndTime,
        reason: app.reason || "",
        status: app.status || "scheduled",
      };
    });

    return res.status(200).json({
      STATUS_CODE: 200,
      message: "Appointments retrieved successfully",
      data,
    });
  } catch (err) {
    console.error("Error in getAllAppointments:", err);
    return res.status(500).json({
      STATUS_CODE: 500,
      message: err.message,
    });
  }
};

module.exports = getAllAppointments;

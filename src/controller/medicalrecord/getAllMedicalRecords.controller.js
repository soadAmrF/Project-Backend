const MedicalRecord = require("../../models/medicalRecord.model");

const getAllMedicalRecords = async (req, res) => {
  try {
    const { search, doctorId, patientId, page = 1, limit = 100 } = req.query;

    // بناء شروط البحث
    const filter = { isDeleted: false };

    // الفلترة حسب المريض
    if (patientId) {
      filter.patientId = patientId;
    }

    // الفلترة حسب الطبيب
    if (doctorId) {
      filter.doctorId = doctorId;
    }

    // البحث الحر (هيتم في الفرونت لأن البحث بيحتاج populate)

    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      MedicalRecord.find(filter)
        .populate("patientId", "fullName phone gender")
        .populate({
          path: "doctorId",
          select: "specialization",
          populate: { path: "userId", select: "fullname name" },
        })
        .populate("appointmentId", "dateAndTime status")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      MedicalRecord.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      count: records.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      data: records,
    });
  } catch (error) {
    console.error("Error fetching medical records:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = getAllMedicalRecords;

const responseToFront = require("../../helpers/response");
const invoiceSchema = require("../../models/invoice.model");
const Patient = require("../../models/patient.model");
const Doctor = require("../../models/doctor.model");

const createInvoice = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      services,
      patientStatus,
      total,
      status,
      paymentMethod,
      invoiceNumber,
    } = req.body;

    if (!patientId) {
      return res
        .status(400)
        .json(responseToFront(400, "patientId is required"));
    }

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(400).json(responseToFront(400, "patient Not found"));
    }

    if (!doctorId) {
      return res.status(400).json(responseToFront(400, "doctorId is required"));
    }

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(400).json(responseToFront(400, "Doctor Not found"));
    }

    if (!services || !Array.isArray(services) || services.length === 0) {
      return res
        .status(400)
        .json(
          responseToFront(
            400,
            "services is required and should be an array of objects",
          ),
        );
    }

    if (
      !patientStatus ||
      !total ||
      !status ||
      !paymentMethod ||
      !invoiceNumber
    ) {
      return res.status(400).json(responseToFront(400, "All fields required"));
    }

    const invoice = await invoiceSchema.create({
      patientId,
      doctorId,
      services,
      patientStatus,
      total,
      status,
      paymentMethod,
      invoiceNumber,
    });

    return res.status(200).json({
      status: 200,
      message: "Added invoic successfully",
      data: invoice,
    });
  } catch (err) {
    return res.status(500).json(responseToFront(500, err.message));
  }
};

module.exports = createInvoice;

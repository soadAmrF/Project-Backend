const responseToFront = require("../../helpers/response");
const invoiceSchema = require("../../models/invoice.model");

const getAllInvoices = async (req, res) => {
  try {
    const getAll = await invoiceSchema
      .find({})
      .populate("patientId", "fullName phone")
      .populate({
        path: "doctorId",
        select: "userId specialization",
        populate: {
          path: "userId",
          select: "fullname phone",
        },
      });

    return res.status(200).json({
      status: "200",
      message: "Get all invoices successfully",
      data: getAll,
    });
  } catch (err) {
    return res.status(500).json(responseToFront(500, err.message));
  }
};

module.exports = getAllInvoices;

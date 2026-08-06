const responseToFront = require("../../helpers/response");
const invoiceSchema = require("../../models/invoice.model");

const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const getById = await invoiceSchema
      .findById(id)
      .populate("patientId", "fullName phone")
      .populate({
        path: "doctorId",
        select: "userId specialization",
        populate: {
          path: "userId",
          select: "fullname phone",
        },
      });

    if (!getById) {
      return res.status(404).json(responseToFront(404, "Invoice not found"));
    }
    return res.status(200).json({
      status: "200",
      message: "Get invoice by ID successfully",
      data: getById,
    });
  } catch (err) {
    return res.status(500).json(responseToFront(500, err.message));
  }
};

module.exports = getInvoiceById;

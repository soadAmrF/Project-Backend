const responseToFront = require("../../helpers/response");
const invoiceSchema = require("../../models/invoice.model");

const cancelInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const cancel = await invoiceSchema.findByIdAndUpdate(
      id,
      { status: "cancelled" },
      { new: true, runValidators: true },
    );

    if (!cancel) {
      return res.status(404).json({
        status: 404,
        message: "Invoice not found",
      });
    }

    return res.status(200).json({
      status: "200",
      message: "Invoice cancelled successfully",
      data: cancel,
    });
  } catch (err) {
    return res.status(500).json(responseToFront(500, err.message));
  }
};

module.exports = cancelInvoice;

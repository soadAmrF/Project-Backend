const invoiceSchema = require("../../models/invoice.model");
const responseToFront = require("../../helpers/response");

const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedInvoice = await invoiceSchema.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedInvoice) {
      return res.status(404).json(responseToFront(404, "Invoice not found"));
    }

    return res.status(200).json({
      status: "200",
      message: "Invoice updated successfully",
      data: updatedInvoice,
    });
  } catch (err) {
    return res.status(500).json(responseToFront(500, err.message));
  }
};

module.exports = updateInvoice;

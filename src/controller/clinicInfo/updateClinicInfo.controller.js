const ClinicInfo = require("../../models/clinicInfo.model");

const updateClinicInfo = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "nameAr",
      "logo",
      "slogan",
      "phone",
      "phone2",
      "email",
      "website",
      "whatsapp",
      "address",
      "city",
      "country",
      "invoicePrefix",
      "invoiceNote",
      "thankYouMessage",
      "taxRate",
      "taxNumber",
      "commercialRegister",
      "bankName",
      "bankAccount",
      "bankIban",
      "workingHours",
      "facebook",
      "instagram",
      "currency",
    ];

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    
    const info = await ClinicInfo.findOneAndUpdate(
      {},
      { $set: updates },
      {
        new: true,
        upsert: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      status: "success",
      data: info,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = updateClinicInfo;

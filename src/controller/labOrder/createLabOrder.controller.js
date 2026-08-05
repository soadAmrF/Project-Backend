const mongoose = require("mongoose");
const LabOrder = require("../../models/labOrder.model");
const LabTest = require("../../models/labTest.model");
const MedicalRecord = require("../../models/medicalRecord.model");

const createLabOrder = async (req, res) => {
  try {
    const { patientId, medicalRecordId, tests, doctorNotes } = req.body;

    
    if (!patientId || !medicalRecordId || !tests || tests.length === 0) {
      throw new Error("patientId, medicalRecordId and tests are required");
    }

    
    const record = await MedicalRecord.findById(medicalRecordId);
    if (!record) {
      throw new Error("Medical record not found");
    }

    
    const doctorId =
      req.user.role === "doctor" ? req.user._id : record.doctorId;

    
    let totalPrice = 0;
    const enrichedTests = [];

    for (const test of tests) {
      const labTest = await LabTest.findById(test.labTestId);
      if (!labTest || !labTest.isActive) {
        throw new Error(`Lab test "${test.labTestId}" not found or inactive`);
      }

      enrichedTests.push({
        labTestId: labTest._id,
        testName: labTest.name,
        price: labTest.price,
        status: "pending",
      });
      totalPrice += labTest.price;
    }

    const order = await LabOrder.create({
      patientId,
      doctorId,
      medicalRecordId,
      tests: enrichedTests,
      totalPrice,
      doctorNotes,
      orderStatus: "pending",
    });

    const populated = await order
      .populate("patientId", "fullName phone")
      .populate("doctorId", "specialization")
      .populate("tests.labTestId", "name code");

    return res.status(201).json({
      status: "success",
      data: populated,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = createLabOrder;

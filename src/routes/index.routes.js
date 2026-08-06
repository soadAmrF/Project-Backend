const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const doctorRoutes = require("./doctor.routes");
const authRoutes = require("./auth.routes");
const medicalRecordRoutes = require("./medicalRecord.routes");
const patientRoutes = require("./patient.route");
const appointmentRoutes = require("./appointment.routes");
const labOrderRoutes = require("./labOrder.routes");
const labTestRoutes = require("./labTest.routes");
const inventoryRoutes = require("./inventory.routes");
const inventoryTransactionRoutes = require("./inventoryTransaction.routes");
const clinicInfoRoutes = require("./clinicInfo.routes");

router.use("/clinic-info", clinicInfoRoutes);
router.use("/inventory-transactions", inventoryTransactionRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/lab-tests", labTestRoutes);
router.use("/lab-orders", labOrderRoutes);
router.use("/medicalrecord", medicalRecordRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/doctors", doctorRoutes);
router.use("/patient", patientRoutes);
router.use("/appointment", appointmentRoutes);

const userRoutes = require("./user.routes");
const doctorRoutes = require("./doctor.routes");
const authRoutes = require("./auth.routes");
const medicalRecordRoutes = require("./medicalRecord.routes");
const patientRoutes = require("./patient.route");
const appointmentRoutes = require("./appointment.routes");
const labOrderRoutes = require("./labOrder.routes");
const labTestRoutes = require("./labTest.routes");
const invoiceRoutes = require("./invoice.routes");

router.use("/labTest", labTestRoutes);
router.use("/labOrder", labOrderRoutes);
router.use("/medicalrecord", medicalRecordRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/doctors", doctorRoutes);
router.use("/patient", patientRoutes);
router.use("/appointment", appointmentRoutes);
router.use("/invoice", invoiceRoutes);

module.exports = router;

const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const doctorRoutes = require('./doctor.routes');
const authRoutes = require('./auth.routes');
const medicalRecordRoutes = require('./medicalRecord.routes');
const patientRoutes = require('./patient.route');
const appointmentRoutes = require('./appointment.routes');
const labOrderRoutes = require('./labOrder.routes');
const labTestRoutes = require('./labTest.routes');

router.use('/labTest', labTestRoutes);
router.use('/labOrder', labOrderRoutes);
router.use('/medicalrecord', medicalRecordRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/doctors', doctorRoutes);
router.use('/patient', patientRoutes);
router.use('/appointment', appointmentRoutes);

module.exports = router;

const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const doctorRoutes = require('./doctor.routes');
const authRoutes = require('./auth.routes');
const medicalRecordRoutes = require('./medicalRecord.routes');

router.use('/medicalrecord', medicalRecordRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/doctors', doctorRoutes);
module.exports = router;
 
 

module.exports = router;

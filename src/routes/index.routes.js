const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const doctorRoutes = require('./doctor.routes');


router.use('/users', userRoutes);
router.use('/doctors', doctorRoutes);
module.exports = router;
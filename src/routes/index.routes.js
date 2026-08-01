const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const doctorRoutes = require('./doctor.routes');
const authRoutes = require('./auth.routes');





router.use('/users', userRoutes);
router.use('/doctors', doctorRoutes);
router.use('/auth', authRoutes);
module.exports = router;
 
 

module.exports = router;

const express = require('express');
const router = express.Router();
const authRouter = require("./auth.routres");
const userRoutes = require('./user.routes');
const doctorRoutes = require('./doctor.routes');

router.use('/auth', authRouter)
router.use('/users', userRoutes);
router.use('/doctors', doctorRoutes);

module.exports = router;
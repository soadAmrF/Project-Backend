const express = require('express');
const router = express.Router();
const authRouter = require("./auth.routes");
const userRoutes = require('./user.routes');
const doctorRoutes = require('./doctor.routes');

router.use('/auth', authRouter)
router.use('/users', userRoutes);
router.use('/doctors', doctorRoutes);

module.exports = router;
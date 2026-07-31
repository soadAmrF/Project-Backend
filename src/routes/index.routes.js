const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const doctorRoutes = require('./doctor.routes');
const authRouter = require("./auth.routes");

router.use('/auth', authRouter);

router.use('/users', userRoutes);
router.use('/doctors', doctorRoutes);
module.exports = router;
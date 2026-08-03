const express = require("express");
const router = express.Router();

const {
  createDoctor,
} = require("../controller/doctors/createDoctor.controller");


const { getAllDoctors } = require("../controller/doctors/getAllDoctors.controller");

const { getDoctorById } = require("../controller/doctors/getDoctorById.controller");

const { updateDoctor } = require("../controller/doctors/updateDoctor.controller");

const checkRole = require("../middleware/checkRole");
const checkToken = require("../middleware/checkToken");

router.get("/", checkToken, checkRole("admin"), getAllDoctors);
router.get("/:id", checkToken, getDoctorById);
router.post("/", checkToken, checkRole("admin"), createDoctor);
router.put("/:id", checkToken, checkRole("admin"), updateDoctor);


module.exports = router;

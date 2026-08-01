const express = require("express");
const router = express.Router();

const {
  createDoctor,
} = require("../controller/doctors/createDoctor.controller");


const { getAllDoctors } = require("../controller/doctors/getAllDoctors.controller");

const { getDoctorById } = require("../controller/doctors/getDoctorById.controller");

const { updateDoctor } = require("../controller/doctors/updateDoctor.controller");
const checkAdmin = require("../middleware/checkAdmin");
const checkToken = require("../middleware/checkToken");
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.post("/", createDoctor);
router.put("/:id", updateDoctor);


module.exports = router;

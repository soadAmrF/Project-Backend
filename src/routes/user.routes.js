const express = require("express");
const router = express.Router();

const { createUser } = require("../controller/users/createUser.controller");
const { deleteUser } = require("../controller/users/deleteuser.controller");
const { getAllUsers } = require("../controller/users/getAllUsers.controller");
const { getUserById } = require("../controller/users/getUserById.controller");
const { updateUser } = require("../controller/users/updateUser.controller");
const { uploadUserImage } = require("../config/cloudinary");

const checkRole = require("../middleware/checkRole");
const checkToken = require("../middleware/checkToken");


router.get("/", checkToken, checkRole("admin"), getAllUsers);
router.get("/:id",checkToken, checkRole("admin"), getUserById);
router.post(
  "/",
  checkToken,
  checkRole("admin"),
  uploadUserImage.single("image"),
  createUser,
);
router.put("/:id", checkToken, checkRole("admin"), uploadUserImage.single("image"), updateUser);
router.delete("/:id", checkToken, checkRole("admin"), deleteUser);

module.exports = router;

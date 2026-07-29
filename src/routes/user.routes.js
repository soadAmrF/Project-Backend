const express = require("express");
const router = express.Router();

const { createUser } = require("../controller/users/createUser.controller");

const { deleteUser } = require("../controller/users/deleteuser.controller");

const { getAllUsers } = require("../controller/users/getAllUsers.controller");

const { getUserById } = require("../controller/users/getUserById.controller");

const { updateUser } = require("../controller/users/updateUser.controller");
const checkAdmin = require("../middleware/checkRole");
const checkToken = require("../middleware/checkToken");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", checkToken, checkAdmin, createUser);
router.put("/:id", checkToken, checkAdmin, updateUser);

router.delete("/:id", checkToken, checkAdmin, deleteUser);

module.exports = router;

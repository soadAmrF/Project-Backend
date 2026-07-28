const express = require('express');
const router = express.Router();


const { createUser, } = require('../controller/users/createUser.controller');

const { deleteUser } = require("../controller/users/deleteuser.controller");

const {
  getAllUsers,
} = require("../controller/users/getAllUsers.controller");

const {
  getUserById,
} = require("../controller/users/getUserById.controller");

const { updateUser } = require("../controller/users/updateUser.controller");



router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;
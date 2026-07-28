const User = require("../../models/user.model");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const {
      name,
      fullname,
      password,
      role = "employee",
      permissions = [],
    } = req.body;

    if (!name || !fullname || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const existingName = await User.findOne({ name });

    if (existingName) {
      return res.status(409).json({
        success: false,
        message: "Name already exists",
      });
    }

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      password: hashedPassword,
      role,
      permissions,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
        permissions: user.permissions,
        isActive: user.isActive,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
};

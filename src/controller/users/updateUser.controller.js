const User = require("../../models/user.model");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, username, password, role, permissions, isActive } = req.body;

    const user = await User.findById(id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name && name !== user.name) {
      const existingUser = await User.findOne({ name });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "User name already exists",
        });
      }

      user.name = name;
    }

    if (username !== undefined) {
      user.username = username;
    }

    if (role !== undefined) {
      user.role = role;
    }

    if (permissions !== undefined) {
      user.permissions = permissions;
    }

    if (isActive !== undefined) {
      user.isActive = isActive;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
        permissions: user.permissions,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Update User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  updateUser,
};

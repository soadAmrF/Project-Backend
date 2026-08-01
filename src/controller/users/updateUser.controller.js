const User = require("../../models/user.model");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, fullname, phone, password, role, isActive } = req.body;

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

    if (fullname !== undefined) {
      user.fullname = fullname;
    }

    if (phone && phone !== user.phone) {
      const existingPhone = await User.findOne({ phone });

      if (existingPhone) {
        return res.status(409).json({
          success: false,
          message: "Phone number already exists",
        });
      }

      user.phone = phone;
    }

    if (role !== undefined) {
      user.role = role;
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
        fullname: user.fullname,
        phone: user.phone,
        role: user.role,
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

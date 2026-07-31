const User = require("../../models/user.model");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    const {
      name,
      fullname,
      password,
      phone,
      role = "receptionist",
      image,
    } = req.body;

    if (!name)
      return res.status(400).json({
        success: false,
        message: "Please provide name",
      });
      if (!fullname)
      return res.status(400).json({
        success: false,
        message: "Please provide fullname",
      });
      if (!phone)
        return res.status(400).json({
          success: false,
          message: "Please provide phone",
        });
    const existingUser = await User.findOne({
      $or: [{ name },{phone}],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message:
          existingUser.name === name
            ? "Name already exists"
            : "Phone number already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      fullname,
      password: hashedPassword,
      phone,
      role,
      image,
      isActive: true,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        fullname: user.fullname,
        phone: user.phone,
        role: user.role,
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

module.exports = { createUser };

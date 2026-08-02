const User = require("../../models/user.model");
const bcrypt = require("bcrypt");
var JWT = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(401).json({
      STATUS_CODE: 401,
      message: "All fields required!",
      data: null,
    });
  }

  const checkUser = await User.findOne({ name }).select(
    "+password fullname phone image isActive createdAt",
  );

  if (!checkUser) {
    return res.status(401).json({
      STATUS_CODE: 401,
      message: "User not found!",
      data: null,
    });
  }

  const checkPassword = await bcrypt.compare(password, checkUser.password);

  if (!checkPassword) {
    return res.status(401).json({
      STATUS_CODE: 401,
      message: "Wrong password!",
      data: null,
    });
  }

  const secret = process.env.JWT_SECRET;

  const token = JWT.sign(
    {
      id: checkUser._id,
      name: checkUser.name,
      fullname: checkUser.fullname,
      phone: checkUser.phone,
      role: checkUser.role,
      image: checkUser.image,
      isActive: checkUser.isActive,
      createdAt: checkUser.createdAt,
    },
    secret,
  );

  res.cookie("token", token, {
    domain: "localhost",
    path: "/",
    secure: true,
  });

  return res.status(200).json({
    STATUS_CODE: 200,
    message: "Login successful!",
    data: {
      token,
      role: checkUser.role,
    },
  });
};
module.exports = userLogin;

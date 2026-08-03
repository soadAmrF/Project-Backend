const User = require("../../models/user.model");

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.findById(id).select("-password");


    if (!users) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get All Users Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
  }
};

module.exports = {
  getUserById
};

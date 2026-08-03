const User = require("../../models/user.model");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.deleteOne();

   return res.status(200).json({
     success: true,
     message: "User deleted successfully",
   });
  } catch (error) {
    console.error("Delete User Error:", error);

   return res.status(500).json({
     success: false,
     message: "Internal Server Error",
   });
  }
};

module.exports = {
  deleteUser
};

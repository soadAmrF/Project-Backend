const checkReceptionist = (req, res, next) => {


    if (req.user.role !== "receptionist") {
        return res.status(403).json({
            STATUS_CODE: 403,
            success:false,
            message:"Only receptionists can perform this action"
        });
    }


    next();
};
module.exports = checkReceptionist;
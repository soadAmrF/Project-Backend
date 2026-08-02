const checkDoctor = (req, res, next) => {


    if (req.user.role !== "doctor") {
        return res.status(403).json({
            STATUS_CODE: 403,
            success:false,
            message:"Only doctors can perform this action"
        });
    }


    next();
};
module.exports = checkDoctor;
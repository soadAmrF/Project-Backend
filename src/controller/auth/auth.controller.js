const User = require("../models/user.model");
const bcrypt = require('bcrypt');
var JWT = require('jsonwebtoken');

const userLogin = async (req, res) => {

    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(401).json({
            STATUS_CODE: 401,
            message: "All fields required!",
            data: null
        });
    };

    const checkUser = await User.findOne({email});

    if(!checkUser) {
        return res.status(401).json({
            STATUS_CODE: 401,
            message: "User not found!",
            data: null
        });
    };

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if(!checkPassword) {
        return res.status(401).json({
            STATUS_CODE: 401,
            message: "Wrong password!",
            data: null
        });
    };

    const secret = process.env.JWT_SECRET;

    const token = JWT.sign({
        name: checkUser.name,
        email: checkUser.email,
        role: checkUser.role
    }, secret);

    res.cookie("token", JWT, {
        domain: "localhost",
        path: "/",
        secure: true
    });

    return res.status(201).json({
        STATUS_CODE: 201,
        message: "Login successful!",
        data: null
    });

};
module.exports = userLogin;
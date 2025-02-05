const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchError } = require("../middlewares/catchError");
const User = require("../models/studentmodel");
const Employee = require("../models/employeModel");

exports.isAuthenticated = catchError(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(
            new ErrorHandler("Not Authorized. Login Again", 401)
        );
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return next(
            new ErrorHandler("Not Authorized. Login Again", 401)
        );
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id) || await Employee.findById(id);
        
        if (!user) {
            return next(
                new ErrorHandler("User not found", 404)
            );
        }

        req.user = user;
        req.id = id;
        next();
    } catch (error) {
        return next(
            new ErrorHandler(error.message, 401)
        );
    }
});
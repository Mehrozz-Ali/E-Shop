const ErrorHandle = require("../utils/ErrorHandler");


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error";

    // wrong mongodb ID error 
    if (err.name === "CastError") {
        const message = `Resources not found with this id.. Invalid ${err.path}`;
        err = new ErrorHandle(message, 400);
    }

    // Dulicate key error 
    if (err.code === 11000) {
        const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandle(message, 400);
    }


    // wrong json web token error 
    if (err.name === "JsonWebTokenError") {
        const message = `Your url is invalid ,please try again later`;
        err = new ErrorHandle(message, 400);
    }


    // if jwt is expired 
    if (err.name === "TokenExpiredError") {
        const message = `Your url is expired, please try again later`;
        err = new ErrorHandle(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}
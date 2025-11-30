const errorHandler = require("../utils/errorHandler")


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error occurred";


    // wrong mongodb id error 
    if (err.name === "CastError") {
        const message = `Resource not found with this id : ${err.path}`;
        err = new errorHandler(message, 400);
    }

    // Duplicate key error 
    if (err.code === 11000) {
        const message = `Dupliccate key ${Object.keys(err.keyValue)} entered`;
        err = new errorHandler(message, 400);
    }

    // wrong jwt error 
    if (err.name === "JsonWebTokenError") {
        const message = `Your url is invalid please try again later `;
        err = new errorHandler(message, 400);
    }


    // jwt expired error 
    if(err.name==="TokenExpiredError"){
        const message=`Your url is expired please try again later `;
        err=new errorHandler(message,400);
    }


    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })

}
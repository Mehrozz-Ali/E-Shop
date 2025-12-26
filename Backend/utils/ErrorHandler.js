
// This code creates a custom error class that attaches an HTTP status code to errors so they can be handled cleanly and centrally in an Express application.
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}


module.exports = ErrorHandler;
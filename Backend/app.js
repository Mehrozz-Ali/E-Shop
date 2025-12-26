const express = require("express");
const ErrorHandler = require("./utils/ErrorHandler");
const app = express();
const cookieParser = require("cookie-parser")




// config 
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/.env" })
}


// its for ErrorHandling 
app.use(ErrorHandler)
module.exports = app
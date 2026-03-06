const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const {isAuthenticated} = require("../middleware/auth");
const Order = require("../model/order");
const Product=require("../model/product");


// create new order


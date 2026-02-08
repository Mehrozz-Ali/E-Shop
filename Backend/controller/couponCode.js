const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const { isSeller } = require("../middleware/auth");
const CouponCode = require("../model/couponCode");



// create coupon code 
router.post("/create-coupon-code", isSeller, catchAsyncErrors(async (req, res, next) => {
    try {
        const isCouponCodeExist = await CouponCode.find({ name: req.body.name });
        if (isCouponCodeExist) {
            return next(new ErrorHandler("Coupon Code already exists", 400))
        }
        const couponCode = await CouponCode.create(req.body);
        res.status(201).json({
            success: true,
            couponCode,
        })
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}))
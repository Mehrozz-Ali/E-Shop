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
        if (isCouponCodeExist.length !== 0) {
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



// get all coupons of a shop 
router.get("/get-coupon/:id", isSeller, catchAsyncErrors(async (req, res, next) => {
    try {
        const couponCodes = await CouponCode.find({ "shop._id": req.params.id });
        res.status(201).json({
            success: true,
            couponCodes,
        })
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}))



// get coupon code value by its name 
router.get("/get-coupon-value/:name", catchAsyncErrors(async (req, res, next) => {
    try {
        const couponCode = await CouponCode.findOne({ name: req.params.name });
        if (!couponCode) {
            return next(new ErrorHandler("Coupon Code not found", 404));
        }
        res.status(201).json({
            success: true,
            couponCode,
        })

    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}))

module.exports = router;
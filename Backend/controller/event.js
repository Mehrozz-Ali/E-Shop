const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const Shop = require("../model/shop");
const Event = require("../model/event");


// create Event 
router.post("/create-event", upload.array("files"), catchAsyncErrors(async (req, res, next) => {
    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if (!shopId) {
            return next(new ErrorHandler("Shop ID is Invalid", 400));
        }
        if (!shop) {
            return next(new ErrorHandler("Shop not found", 400));
        }
        else {
            const files = req.files;
            const imagesUrls = files.map((file) => `${file.filename}`);
            const eventData = req.body;
            eventData.images = imagesUrls;
            eventData.shopId = shop._id.toString();
            eventData.shop = {
                _id: shop._id.toString(),
                name: shop.name,
                email: shop.email,
                avatar: shop.avatar,
            };


            const product = await Event.create(eventData);
            res.status(201).json({
                success: true,
                product,
            })

        }
    } catch (error) {
        return next(new ErrorHandler(error, 400))
    }
}))


module.exports = router;
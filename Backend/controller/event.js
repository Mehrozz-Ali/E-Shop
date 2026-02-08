const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const Shop = require("../model/shop");
const Event = require("../model/event");
const { isSeller } = require("../middleware/auth");
const fs = require("fs");


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


// get all events of a shop
router.get("/get-all-events/:id", catchAsyncErrors(async (req, res, next) => {
    try {
        const events = await Event.find({ shopId: req.params.id });
        res.status(201).json({
            success: true,
            events,
        })
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}))


// delete event of a shop
router.delete("/delete-shop-event/:id", isSeller, catchAsyncErrors(async (req, res, next) => {
    try {
        const productId = req.params.id;
        const eventData = await Event.findById(productId);


        eventData.images.forEach((imageUrl) => {
            const filename = imageUrl;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                }
            })
        });

        const event = await Event.findByIdAndDelete(productId);
        if (!event) {
            return next(new ErrorHandler("Event not found with this id ", 500));
        }

        res.status(201).json({
            success: true,
            message: "Event Deleted Successfully",
        })
    } catch (error) {
        return next(new ErrorHandler(error, 400));
    }
}))



module.exports = router;
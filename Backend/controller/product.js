const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");



// create Product
router.post("/create-product", upload.array("files"), catchAsyncErrors(async (req, res, next) => {
    try {
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if (!shopId) {
            return next(new ErrorHandler("Shop ID is Invalid", 400));
        } else {
            const files = req.files;
            const imagesUrls = files.map((file) => `${file.fileName}`);
            const productData = req.body;
            productData.images = imagesUrls;
            productData.shop = shop;


            const product = await Product.create(productData);
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
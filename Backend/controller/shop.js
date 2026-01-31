const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const Shop = require("../model/shop");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated, isSeller } = require("../middleware/auth");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { log } = require("console");
const sendShopToken = require("../utils/shopToken");




// create shop 
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
    try {
        const { email } = req.body;
        const sellerEmail = await Shop.findOne({ email });

        if (sellerEmail) {
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Error deleting file' })
                }
            });
            return next(new ErrorHandler("Shop already exists", 400));
        }
        const filename = req.file.filename;
        const fileUrl = path.join(filename);
        const seller = {
            name: req.body.name,
            email: email,
            password: req.body.password,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            zipCode: req.body.zipCode,
            avatar: {
                public_id: filename,
                url: fileUrl,
            }
        };
        const activationToken = createActivationToken(seller);
        const activationUrl = `http://localhost:5173/seller/activation/${activationToken}`;
        try {
            await sendMail({
                email: seller.email,
                subject: "Activate Your Shop",
                message: `Hello ${seller.name}, please activate your account using the following link: ${activationUrl}`,
            })
            res.status(201).json({
                success: true,
                message: `Please check your email:- ${seller.email} to activate your shop!`
            })
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})


// create activation token
const createActivationToken = (seller) => {
    return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
        expiresIn: '5m',
    })
}

// activate seller account
router.post("/activation", catchAsyncErrors(async (req, res, next) => {
    try {
        const { activation_token } = req.body;
        const newSeller = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
        if (!newSeller) {
            return next(new ErrorHandler("Invalid token", 400));
        }
        const { name, email, password, avatar, zipCode, address, phoneNumber } = newSeller;
        let seller = await Shop.findOne({ email: email });
        if (seller) {
            return next(new ErrorHandler("Shop already exists", 400));
        }
        seller = await Shop.create({
            name,
            email,
            avatar,
            password,
            zipCode,
            address,
            phoneNumber,
        })
        sendShopToken(seller, 201, res);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))


// login shop 
router.post("/login-shop", catchAsyncErrors(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Please provide email and password", 400));
        }
        const seller = await Shop.findOne({ email: email }).select("+password");
        if (!seller) {
            return next(new ErrorHandler("Shop does not exist", 400));
        }
        const isPasswordValid = await seller.comparePassword(password);
        if (!isPasswordValid) {
            return next(new ErrorHandler("Invalid password", 400));
        }

        sendShopToken(seller, 201, res);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))


// load shop
router.get("/getSeller", isSeller, catchAsyncErrors(async (req, res, next) => {
    try {
        const seller = await Shop.findById(req.seller._id);
        if (!seller) {
            return next(new ErrorHandler("Shop not found", 404));
        }

        res.status(200).json({
            success: true,
            seller,
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))



module.exports = router;

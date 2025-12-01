const express = require('express');
const path = require('path');
const router = express.Router();
const User = require('../model/user');
const { upload } = require('../multer');
const ErrorHandler = require('../utils/ErrorHandler');
const fs = require('fs');
const jwt = require("jsonwebtoken");
const sendMail = require('../utils/sendMail');
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')


// create user
router.post("/create-user", upload.single("avatar"), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const userEmail = await User.findOne({ email });
        if (userEmail) {
            return next(new ErrorHandler("User already exists", 400));
        }

        const fileUrl = req.file.path;

        const myCloud = await cloudinary.v2.uploader.upload(fileUrl, {
            folder: "avatars",
        });

        const user = {
            name,
            email,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        };

        const activationToken = createActivationToken(user);

        const activationUrl = `http://localhost:5173/activation/${activationToken}`;

        await sendMail({
            email: user.email,
            subject: "Activate your account",
            message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
        });

        res.status(201).json({
            success: true,
            message: `Please check your email (${user.email}) to activate your account!`,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});


// create activation token
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
};

// activate user
router.post("/activation",catchAsyncErrors(async (req, res, next) => {
        try {
            const { activation_token } = req.body;

            const newUser = jwt.verify(
                activation_token,
                process.env.ACTIVATION_SECRET
            );

            if (!newUser) {
                return next(new ErrorHandler("Invalid token", 400));
            }
            const { name, email, password, avatar } = newUser;

            let user = await User.findOne({ email });

            if (user) {
                return next(new ErrorHandler("User already exists", 400));
            }
            user = await User.create({
                name,
                email,
                avatar,
                password,
            });

            sendToken(user, 201, res);
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);

module.exports = router;
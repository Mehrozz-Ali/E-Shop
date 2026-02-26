const express = require("express");
const path = require("path");
const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const { url } = require("inspector");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middleware/auth");
const mongoose = require("mongoose");


router.post("/create-user", upload.single("file"), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userEmail = await User.findOne({ email: email });

        if (userEmail) {
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: 'Error deleting file' })
                }
            });
            return next(new ErrorHandler("User already exists", 400));
        }

        const filename = req.file.filename;
        const fileUrl = path.join(filename);
        const user = {
            name: name,
            email: email,
            password: password,
            avatar: {
                public_id: filename,
                url: fileUrl,
            }
        };
        const activationToken = createActivationToken(user);
        const activationUrl = `http://localhost:5173/activation/${activationToken}`;
        try {
            await sendMail({
                email: user.email,
                subject: "Activate Your Account",
                message: `Hello ${user.name}, please activate your account using the following link: ${activationUrl}`,
            })
            res.status(201).json({
                success: true,
                message: `Please check your email:- ${user.email} to activate your account!`
            })
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
})



// create activation token 
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: '5m',
    })
}

// activate user 
router.post("/activation", catchAsyncErrors(async (req, res, next) => {
    try {
        const { activation_token } = req.body;
        const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);
        if (!newUser) {
            return next(new ErrorHandler("Invalid token", 400));
        }
        const { name, email, password, avatar } = newUser;
        let user = await User.findOne({ email: email });
        if (user) {
            return next(new ErrorHandler("User already exists", 400));
        }
        user = await User.create({
            name,
            email,
            avatar,
            password,
        })
        sendToken(user, 201, res);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))



// login user 
router.post("/login-user", catchAsyncErrors(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Please provide email and password", 400));
        }
        const user = await User.findOne({ email: email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("User does not exist", 400));
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return next(new ErrorHandler("Invalid password", 400));
        }

        sendToken(user, 201, res);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))




// LogOut User 
router.get("/logout", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        res.status(201).json({
            success: true,
            message: "Log out Successfully",
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))



// load user
router.get("/getuser", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))


// update user info 
router.put("/update-user-info", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
    try {
        const { email, password, phoneNumber, name } = req.body;
        const user = await User.findById(req.user.id).select("+password");

        if (!user) {
            return next(new ErrorHandler("User not found", 400));
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return next(new ErrorHandler("Invalid password", 400));
        }

        user.name = name;
        user.email = email;
        user.phoneNumber = phoneNumber;
        await user.save();
        res.status(201).json({
            success: true,
            user,
        })

    } catch (error) {
        console.log(error);
        return next(new ErrorHandler(error.message, 500));
    }
}))


// update user avatar 
router.put("/update-avatar", isAuthenticated, upload.single("file"), catchAsyncErrors(async (req, res, next) => {
    try {
        const existUser = await User.findById(req.user.id);
        if (existUser.avatar) {
            const existAvatarPath = `uploads/${existUser.avatar}`;
            if (fs.existsSync(existAvatarPath)) {
                fs.unlinkSync(existAvatarPath);
            }
        }


        const fileUrl = path.join(req.file.filename);
        const avatar = {
            public_id: req.file.filename,
            url: fileUrl,
        };
        const user = await User.findByIdAndUpdate(req.user.id, { avatar: avatar }, { new: true });

        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));

    }
}))



// update user addresses
router.put("/update-user-addresses", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const sameTypeAddress = user.addresses.find((address) => address.addressType === req.body.addressType);
        if (sameTypeAddress) {
            return next(new ErrorHandler(`${req.body.addressType} address already exists`));
        }
        const existsAddress = user.addresses.find(address => address._id === req.body._id);
        if (existsAddress) {
            Object.assign(existsAddress, req.body);
        } else {
            // add new address to array 
            user.addresses.push(req.body);
        }
        await user.save();
        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))





router.delete("/delete-user-address/:id", isAuthenticated, catchAsyncErrors(async (req, res, next) => {
    try {
        const userId = req.user._id;
        let addressId = req.params.id;
        if (addressId.startsWith(":")) {
            addressId = addressId.slice(1);
        }
        if (!addressId.match(/^[0-9a-fA-F]{24}$/)) {
            return next(new ErrorHandler("Invalid address ID format", 400));
        }
        const mongoose = require("mongoose");
        const objectId = new mongoose.Types.ObjectId(addressId);

        await User.updateOne({
            _id: userId,
        }, { $pull: { addresses: { _id: objectId } } });

        const user = await User.findById(userId);

        res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}))


module.exports = router;
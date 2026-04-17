const Messages = require('../model/messages');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const router = require('express').Router();


// create new message 
router.post("/create-new-message", upload.array("files"), catchAsyncErrors(async (req, res, next) => {
    try {
        const messageData = req.body;

        if (req.files) {
            const files = req.files;
            const imageUrls = files.map((file) => `${file.fileName}`);

            messageData.images = imageUrls;
        }

        messageData.conversationId = req.body.conversationId;
        messageData.sender = req.body.sender;

        const message = new Messages({
            conversationId: messageData.conversationId,
            sender: messageData.sender,
            imgaes: messageData.images ? messageData.images : undefined,
        })

        await message.save();

        res.status(201).json({
            success: true,
            message,
        })

    } catch (error) {
        return next(new ErrorHandler(error.response.message, 500));
    }
}))


module.exports = router;



const Conversation = require('../model/conversation');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const router = require('express').Router();


// create a new conversation
router.post("/create-new-conversation", catchAsyncErrors(async (req, res, next) => {
    try {
        const { groupTitle, userId, sellerId } = req.body;

        const isConversationExist = await Conversation.findOne({ groupTitle });

        if (isConversationExist) {
            const conversation = isConversationExist;
            res.status(201).json({
                success: true,
                conversation,
            })
        } else {
            const conversation = await Conversation.create({
                members: [userId, sellerId],
                groupTitle: groupTitle,
            })

            res.status(201).json({
                success: true,
                conversation,
            })
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
}));



// get user conversations
module.exports = router;
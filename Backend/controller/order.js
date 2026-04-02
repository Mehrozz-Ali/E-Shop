const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller } = require("../middleware/auth");
const Order = require("../model/order");
const Product = require("../model/product");
const { create } = require("../model/user");


// create new order
router.post("/create-order", catchAsyncErrors(async (req, res, next) => {
    try {
        const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

        // group cart items by shopId
        const shopItemsMap = new Map();

        console.log(cart);
        for (const item of cart) {
            const shopId = item.shopId;
            if (!shopItemsMap.has(shopId)) {
                shopItemsMap.set(shopId, []);
            }
            shopItemsMap.get(shopId).push(item);
        }

        // create an order for each shop
        const orders = [];

        for (const [shopId, items] of shopItemsMap) {
            const order = await Order.create({ cart: items, shippingAddress, user, totalPrice, paymentInfo });
            orders.push(order);
        }

        res.status(201).json({
            success: true,
            orders,
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
}))


// get all orders of a user
router.get("/get-all-orders/:userId", catchAsyncErrors(async (req, res, next) => {
    try {

        const orders = await Order.find({ "user._id": req.params.userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders,
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
}))


// get all orders of a seller 
router.get("/get-seller-all-orders/:shopId", catchAsyncErrors(async (req, res, next) => {
    try {
        const orders = await Order.find({ "cart.shopId": req.params.shopId }).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            orders,
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
}))




// update order status  for just seller 
router.put("/update-order-status/:id", isSeller, catchAsyncErrors(async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return next(new ErrorHandler("Order not found with this id", 400));
        }

        if (!req.body.status) {
            return next(new ErrorHandler("Status is required", 400));
        }


        const status = req.body.status.trim();
        if (
            status === "Transferred to delivery partner" &&
            order.status !== "Transferred to delivery partner"
        ) {
            await Promise.all(
                order.cart.map(o => updateOrder(o._id, o.qty))
            );
        }



        order.status = status;
        if (status === "Delivered") {
            order.deliveredAt = Date.now();
            order.paymentInfo.status = "Succeeded";
        }
        await order.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            order,
        })

        async function updateOrder(id, qty) {
            const product = await Product.findById(id);
            if (!product) return;
            product.stock -= qty;
            product.sold_out += qty;

            await product.save({ validateBeforeSave: false });
        }

    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
}))


module.exports = router;


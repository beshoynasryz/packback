
import Order from "./order.model.js";
import Product from "../product/product.model.js";
import { AppError, asyncHandler } from "../../utils/globalErrorHandling/index.js";

export const createOrderService = asyncHandler(async (data) => {
    const { userId, userName, userEmail, shippingAddress, items, paymentMethod } = data;

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) {
            throw new AppError(`Product with ID ${item.productId} not found`, 404);
        }
        if (product.inStock < item.quantity) {
            throw new AppError(`Insufficient stock for product ${product.name}`, 400);
        }
        totalAmount += product.price * item.quantity;
        orderItems.push({
            productId: product._id,
            productName: product.name,
            quantity: item.quantity,
            price: product.price,
        });
        // Decrement product stock
        product.inStock -= item.quantity;
        await product.save();
    }

    const newOrder = await Order.create({
        userId,
        userName,
        userEmail,
        shippingAddress,
        items: orderItems,
        paymentMethod,
        totalAmount,
    });

    return newOrder;
});

export const getOrderByIdService = asyncHandler(async (orderId) => {
    const order = await Order.findById(orderId).populate('items.productId');
    if (!order) {
        throw new AppError("Order not found", 404);
    }
    return order;
});

export const getAllOrdersService = asyncHandler(async () => {
    const orders = await Order.find().populate('items.productId');
    return orders;
});

export const updateOrderStatusService = asyncHandler(async (orderId, status) => {
    const order = await Order.findById(orderId);
    if (!order) {
        throw new AppError("Order not found", 404);
    }
    order.status = status;
    await order.save();
    return order;
});

export const deleteOrderService = asyncHandler(async (orderId) => {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
        throw new AppError("Order not found", 404);
    }
    // Increment product stock back if order is deleted
    for (const item of order.items) {
        const product = await Product.findById(item.productId);
        if (product) {
            product.inStock += item.quantity;
            await product.save();
        }
    }
    return { message: "Order deleted successfully" };
});

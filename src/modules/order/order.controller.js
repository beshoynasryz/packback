
import { asyncHandler } from "../../utils/globalErrorHandling/index.js";
import { createOrderService, getOrderByIdService, getAllOrdersService, updateOrderStatusService, deleteOrderService } from "./order.service.js";

export const createOrder = asyncHandler(async (req, res, next) => {
    const newOrder = await createOrderService(req.body);
    res.status(201).json({ message: "Order created successfully", order: newOrder });
});

export const getOrderById = asyncHandler(async (req, res, next) => {
    const order = await getOrderByIdService(req.params.id);
    res.status(200).json({ message: "Order fetched successfully", order });
});

export const getAllOrders = asyncHandler(async (req, res, next) => {
    const orders = await getAllOrdersService();
    res.status(200).json({ message: "Orders fetched successfully", orders });
});

export const updateOrderStatus = asyncHandler(async (req, res, next) => {
    const { status } = req.body;
    const updatedOrder = await updateOrderStatusService(req.params.id, status);
    res.status(200).json({ message: "Order status updated successfully", order: updatedOrder });
});

export const deleteOrder = asyncHandler(async (req, res, next) => {
    const result = await deleteOrderService(req.params.id);
    res.status(200).json(result);
});


import { Router } from "express";
import { createOrder, getOrderById, getAllOrders, updateOrderStatus, deleteOrder } from "./order.controller.js";
import { auth } from "../../middlewares/Auth.middleware.js";
import { isAuthorized } from "../../middlewares/Authorization.middleware.js";
import { validation } from "../../middlewares/Validation/validation.middleware.js";
import { createOrderSchema, updateOrderStatusSchema } from "./order.validation.js";

const orderRoutes = Router();

orderRoutes.post("/", auth, validation(createOrderSchema), createOrder);
orderRoutes.get("/:id", auth, getOrderById);
orderRoutes.get("/", auth, isAuthorized('admin'), getAllOrders);
orderRoutes.patch("/:id/status", auth, isAuthorized('admin'), validation(updateOrderStatusSchema), updateOrderStatus);
orderRoutes.delete("/:id", auth, isAuthorized('admin'), deleteOrder);

export default orderRoutes;

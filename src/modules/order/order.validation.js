
import Joi from "joi";
import generalRules from "../../utils/generalRules/index.js";

export const createOrderSchema = Joi.object({
    body: Joi.object({
        userId: generalRules.id.required(),
        userName: Joi.string().required(),
        userEmail: generalRules.email.required(),
        shippingAddress: Joi.object({
            street: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            zip: Joi.string().required(),
            country: Joi.string().required(),
        }).required(),
        items: Joi.array().items(Joi.object({
            productId: generalRules.id.required(),
            quantity: Joi.number().integer().min(1).required(),
        })).required(),
        paymentMethod: Joi.string().required(),
    }).required(),
});

export const updateOrderStatusSchema = Joi.object({
    params: Joi.object({
        id: generalRules.id.required(),
    }).required(),
    body: Joi.object({
        status: Joi.string().valid('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled').required(),
    }).required(),
});


import joi from "joi";
import { generalRules } from "../../utils/generalRules/index.js";


export const addRatingSchema = {
    body: joi.object({
        comment: joi.string().required(),
        rate: joi.number().min(1).max(5).required(),
        productId: generalRules.id.required(),
    }),
    headers: joi.object({
        token: joi.string().required(),
    }).unknown(true),
};

export const updateRatingSchema = {
    body: joi.object({
        comment: joi.string(),
        rate: joi.number().min(1).max(5),
        productId: generalRules.id.required(),
    }),
    headers: joi.object({
        token: joi.string().required(),
    }).unknown(true),
};

export const deleteRatingSchema = {
    body: joi.object({
        productId: generalRules.id.required(),
    }),
    headers: joi.object({
        token: joi.string().required(),
    }).unknown(true),
};

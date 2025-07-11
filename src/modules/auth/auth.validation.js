
import Joi from "joi";
import generalRules from "../../utils/generalRules/index.js";

export const signupSchema = Joi.object({
    body: Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: generalRules.email.required(),
        password: generalRules.password.required(),
        phone: Joi.string().required(),
    }).required(),
});

export const signinSchema = Joi.object({
    body: Joi.object({
        email: generalRules.email.required(),
        password: generalRules.password.required(),
    }).required(),
});

// src/utils/generalRules/index.js
import Joi from "joi";

const idValidation = (value, helper) => {
    const isValidId = Types.ObjectId.isValid(value);
    return isValidId ? value : helper.message(`Invalid id: ${value}`);
};

const generalRules = {
    email: Joi.string().email({ tlds: { allow: true }, minDomainSegments: 2, maxDomainSegments: 2 }),
    password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    id: Joi.string().custom(idValidation),
    headers: Joi.object({
        authorization: Joi.string().required(),
        'cache-control': Joi.string(),
        'postman-token': Joi.string(),
        'content-type': Joi.string(),
        'content-length': Joi.string(),
        host: Joi.string(),
        'user-agent': Joi.string(),
        accept: Joi.string(),
        'accept-encoding': Joi.string(),
        connection: Joi.string(),
    }),
};

// Default export
export default generalRules;

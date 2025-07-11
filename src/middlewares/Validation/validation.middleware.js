
import { AppError, asyncHandler } from "../../utils/globalErrorHandling/index.js";

const dataMethods = ["body", "query", "params"];

export const validation = (schema) => {
    return asyncHandler((req, res, next) => {
        const validationErrors = [];
        dataMethods.forEach((key) => {
            if (schema[key]) {
                const { error } = schema[key].validate(req[key], { abortEarly: false });
                if (error) {
                    validationErrors.push(...error.details);
                }
            }
        });

        if (validationErrors.length) {
            return next(new AppError(validationErrors.map((err) => err.message).join(", "), 400));
        }
        return next();
    });
};

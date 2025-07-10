
import { AppError } from "../utils/globalErrorHandling/index.js";

export const isAuthorized = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError("You are not authorized to perform this action", 403));
        }
        return next();
    };
};

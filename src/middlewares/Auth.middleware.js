
import User from "../modules/user/user.model.js";
import { verifyToken } from "../utils/token/verify.js";
import { AppError, asyncHandler } from "../utils/globalErrorHandling/index.js";

export const auth = asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith(process.env.BEARER_KEY)) {
        return next(new AppError("Authorization is required or Bearer key is invalid", 401));
    }
    const token = authorization.split(process.env.BEARER_KEY)[1];
    if (!token) {
        return next(new AppError("Token is required", 401));
    }
    const decoded = verifyToken({ token });
    if (!decoded?.id) {
        return next(new AppError("Invalid token payload", 401));
    }
    const authUser = await User.findById(decoded.id);
    if (!authUser) {
        return next(new AppError("User not found", 404));
    }
    req.user = authUser;
    return next();
});

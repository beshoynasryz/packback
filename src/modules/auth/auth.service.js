
import User from "../user/user.model.js";
import { AppError, asyncHandler } from "../../utils/globalErrorHandling/index.js";
import { hashPassword, comparePassword } from "../../utils/Hash/hashing.js";
import { generateToken } from "../../utils/token/generateToken.js";

export const signupService = asyncHandler(async (data) => {
    const { email, password, phone } = data;
    const userExist = await User.findOne({ email });
    if (userExist) {
        throw new AppError("Email already exists", 409);
    }
    const hashedPassword = await hashPassword({ payload: password });
    const newUser = await User.create({ ...data, password: hashedPassword });
    return newUser;
});

export const signinService = asyncHandler(async (data) => {
    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError("Invalid login credentials", 401);
    }
    const isMatch = await comparePassword({ payload: password, reference: user.password });
    if (!isMatch) {
        throw new AppError("Invalid login credentials", 401);
    }
    const token = generateToken({ payload: { id: user._id, role: user.role } });
    return { user, token };
});

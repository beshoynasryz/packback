
import { asyncHandler } from "../../utils/globalErrorHandling/index.js";
import { signinService, signupService } from "./auth.service.js";

export const signup = asyncHandler(async (req, res, next) => {
    const newUser = await signupService(req.body);
    res.status(201).json({ message: "User registered successfully", user: newUser });
});

export const signin = asyncHandler(async (req, res, next) => {
    const { user, token } = await signinService(req.body);
    res.status(200).json({ message: "Login successful", user, token });
});


import { Router } from "express";
import { signin, signup } from "./auth.controller.js";
import { validation } from "../../middlewares/Validation/validation.middleware.js";
import { signupSchema, signinSchema } from "./auth.validation.js";

const authRoutes = Router();

authRoutes.post("/signup", validation(signupSchema), signup);
authRoutes.post("/signin", validation(signinSchema), signin);

export default authRoutes;

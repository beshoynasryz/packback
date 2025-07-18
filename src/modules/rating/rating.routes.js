
import { Router } from "express";
import * as ratingController from "./rating.controller.js";
import { validationMiddleware } from "../../middlewares/Validation/validation.middleware.js";
import * as ratingValidation from "./rating.validation.js";
import { authMiddleware } from "../../middlewares/Auth.middleware.js";


const router = Router();


router.post("/add",
    authMiddleware(),
    validationMiddleware(ratingValidation.addRatingSchema),
    ratingController.addRating
);


router.put("/update",
    authMiddleware(),
    validationMiddleware(ratingValidation.updateRatingSchema),
    ratingController.updateRating
);


router.delete("/delete",
    authMiddleware(),
    validationMiddleware(ratingValidation.deleteRatingSchema),
    ratingController.deleteRating
);


export default router;


import * as ratingService from "./rating.service.js";


export const addRating = async (req, res, next) => {
    const {
        comment,
        rate,
        productId
    } = req.body;
    const { _id } = req.user;

    const result = await ratingService.addRating(_id, productId, comment, rate);

    return res.status(result.status).json({
        message: result.message,
        data: result.data,
    });
};


export const updateRating = async (req, res, next) => {
    const {
        comment,
        rate,
        productId
    } = req.body;
    const { _id } = req.user;

    const result = await ratingService.updateRating(_id, productId, comment, rate);

    return res.status(result.status).json({
        message: result.message,
        data: result.data,
    });
};


export const deleteRating = async (req, res, next) => {
    const { productId } = req.body;
    const { _id } = req.user;

    const result = await ratingService.deleteRating(_id, productId);

    return res.status(result.status).json({
        message: result.message,
    });
};

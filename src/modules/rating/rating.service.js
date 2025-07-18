
import productModel from "../product/product.model.js";
import ratingModel from "./rating.model.js";



export const addRating = async (userId, productId, comment, rate) => {
    const product = await productModel.findById(productId);
    if (!product) {
        return {
            status: 404,
            message: "Product not found",
        };
    }

    const rating = await ratingModel.create({
        userId,
        productId,
        comment,
        rate,
    });

    let calcRate = product.rate;
    calcRate = (calcRate * product.ratingCount + rate) / (product.ratingCount + 1);
    product.rate = calcRate;
    product.ratingCount += 1;

    await product.save();

    return {
        status: 201,
        message: "Rating added successfully",
        data: rating,
    };
};


export const updateRating = async (userId, productId, comment, rate) => {
    const product = await productModel.findById(productId);
    if (!product) {
        return {
            status: 404,
            message: "Product not found",
        };
    }

    const rating = await ratingModel.findOne({
        userId,
        productId,
    });

    if (!rating) {
        return {
            status: 404,
            message: "Rating not found",
        };
    }

    let calcRate = product.rate;
    calcRate = (calcRate * product.ratingCount - rating.rate + rate) / product.ratingCount;
    product.rate = calcRate;

    await product.save();

    rating.comment = comment || rating.comment;
    rating.rate = rate || rating.rate;

    await rating.save();

    return {
        status: 200,
        message: "Rating updated successfully",
        data: rating,
    };
};


export const deleteRating = async (userId, productId) => {
    const product = await productModel.findById(productId);
    if (!product) {
        return {
            status: 404,
            message: "Product not found",
        };
    }

    const rating = await ratingModel.findOneAndDelete({
        userId,
        productId,
    });

    if (!rating) {
        return {
            status: 404,
            message: "Rating not found",
        };
    }

    let calcRate = product.rate;
    calcRate = (calcRate * product.ratingCount - rating.rate) / (product.ratingCount - 1);
    product.rate = calcRate;
    product.ratingCount -= 1;

    await product.save();

    return {
        status: 200,
        message: "Rating deleted successfully",
    };
};

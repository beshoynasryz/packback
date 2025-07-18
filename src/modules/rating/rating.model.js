
import mongoose from "mongoose";


const ratingSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});

const ratingModel = mongoose.model("Rating", ratingSchema);

export default ratingModel;

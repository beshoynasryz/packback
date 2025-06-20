import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    subcategory: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    color: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      enum: ['featured', 'newArrival', 'bestSeller',null],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.models.Product || mongoose.model('Product', productSchema);
export default productModel;

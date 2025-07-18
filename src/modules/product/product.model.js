import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		title: {
			type: String,
			required: true,
			trim: true
		},
		description: {
			type: String,
			required: true,
			trim: true
		},
		price: {
			type: Number,
			required: true,
			min: 0
		},

		images: {
			type: [String],
			required: true
		},
		sizes: {
			type: [String],
			required: true,
			enum: ['S', 'M', 'L', 'XL', 'XXL']
		},
		materials: {
			type: [String]
		},
		tags: {
			type: [String],
			enum: ['new-arrival', 'best-seller', 'featured', 'limited-edition']
		},

		inStock: {
			type: Boolean,
			required: true,
			default: true
		},
		colors: {
			type: [String],
			required: true
		},
		rate: {
			type: Number,
			default: 0
		},
		ratingCount: {
			type: Number,
			default: 0
		}
	},
	{
		timestamps: true
	}
);

const productModel =
	mongoose.models.Product || mongoose.model('Product', productSchema);
export default productModel;

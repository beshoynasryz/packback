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
		category: {
			type: String,
			required: true,
			trim: true
		},
		images: {
			type: [String],
			required: true
		},
		sizes: {
			type: [String],
			required: true
		},
		materials: {
			type: [String]
		},
		tags: {
			type: [String]
		},
	
		inStock: {
			type: Boolean,
			required: true,
			default: true
		},
		colors: {
			type: [String],
			required: true
		}
	},
	{
		timestamps: true
	}
);

const productModel =
	mongoose.models.Product || mongoose.model('Product', productSchema);
export default productModel;

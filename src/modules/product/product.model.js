import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		id: {
			type: Number,

			unique: true
		},
		name: {
			type: String,
			required: true,
			trim: true
		},
		price: {
			type: Number,
			required: true,
			min: 0
		},
		image: {
			type: String
		},
		description: {
			type: String,

			trim: true
		},
		stock: {
			type: Number,

			min: 0
		},
		rating: {
			type: Number,

			min: 0,
			max: 5
		},
		color: {
			type: String
		},
		tags: {
			type: [String],
			enum: ['featured', 'newArrival', 'bestSeller', null],
			default: null
		}
	},
	{
		timestamps: true
	}
);

const productModel =
	mongoose.models.Product || mongoose.model('Product', productSchema);
export default productModel;

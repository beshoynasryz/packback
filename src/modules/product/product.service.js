
import expressAsyncHandler from 'express-async-handler';
import { Hash } from '../../utils/Hash/index.js';
import productModel from './product.model.js';

export const createProduct = expressAsyncHandler(async (req, res, next) => {
	const { name, description, price, category, stock } = req.body;

	if (!name || !description || !price || !category || !stock) {
		return next(new Error('All fields are required'));
	}

	const existingProduct = await productModel.findOne({ name });
	if (existingProduct) {
		return res.status(400).send({ message: 'Product already exists' });
	}

	const product = await productModel.create({
		name,
		description,
		price,
		category,
		stock
	});

	res.status(201).json({
		success: true,
		message: 'Product created successfully',
		data: product
	});
});
export const getProductById = expressAsyncHandler(async (req, res, next) => {
	const { id } = req.params;

	if (!id) {
		return next(new Error('Product ID is required'));
	}

	const product = await productModel.findById(id);

	if (!product) {
		return res.status(404).json({ message: 'Product not found' });
	}

	res.status(200).json({
		success: true,
		data: product
	});
});
export const updateProduct = expressAsyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const { name, description, price, category, stock } = req.body;

	if (!id) {
		return next(new Error('Product ID is required'));
	}

	const product = await productModel.findByIdAndUpdate(
		id,
		{ name, description, price, category, stock },
		{ new: true }
	);

	if (!product) {
		return res.status(404).json({ message: 'Product not found' });
	}

	res.status(200).json({
		success: true,
		message: 'Product updated successfully',
		data: product
	});
});
export const deleteProduct = expressAsyncHandler(async (req, res, next) => {
	const { id } = req.params;

	if (!id) {
		return next(new Error('Product ID is required'));
	}

	const product = await productModel.findByIdAndDelete(id);

	if (!product) {
		return res.status(404).json({ message: 'Product not found' });
	}

	res.status(200).json({
		success: true,
		message: 'Product deleted successfully'
	});
});
export const getAllProducts = expressAsyncHandler(async (req, res) => {
	const products = await productModel.find({});
	res.status(200).json({
		success: true,
		data: products
	});
});
export const searchProducts = expressAsyncHandler(async (req, res) => {
	const { query } = req.query;

	if (!query) {
		return res.status(400).json({ message: 'Search query is required' });
	}

	const products = await productModel.find({
		$or: [
			{ name: { $regex: query, $options: 'i' } },
			{ description: { $regex: query, $options: 'i' } }
		]
	});

	res.status(200).json({
		success: true,
		data: products
	});
});




export const getBestSellerProducts = expressAsyncHandler(async (req, res) => {
	const products = await productModel.find({ tags: 'bestSeller' });

	if (products.length === 0) {
		return res.status(404).json({ message: 'No best seller products found' });
	}

	res.status(200).json({
		success: true,
		data: products
	});
});
export const getProductsByColor = expressAsyncHandler(async (req, res) => {
	const { color } = req.params;

	if (!color) {
		return res.status(400).json({ message: 'Color is required' });
	}

	const products = await productModel.find({ color });

	if (products.length === 0) {
		return res.status(404).json({ message: 'No products found in this color' });
	}

	res.status(200).json({
		success: true,
		data: products
	});
});
export const getProductsByPriceRange = expressAsyncHandler(async (req, res) => {
	const { minPrice, maxPrice } = req.query;

	if (!minPrice || !maxPrice) {
		return res.status(400).json({ message: 'Min and Max price are required' });
	}

	const products = await productModel.find({
		price: { $gte: minPrice, $lte: maxPrice }
	});

	if (products.length === 0) {
		return res
			.status(404)
			.json({ message: 'No products found in this price range' });
	}

	res.status(200).json({
		success: true,
		data: products
	});
});
export const getProductsByTag = expressAsyncHandler(async (req, res) => {
	const { tag } = req.params;

	if (!tag) {
		return res.status(400).json({ message: 'Tag is required' });
	}

	const products = await productModel.find({ tags: tag });

	if (products.length === 0) {
		return res
			.status(404)
			.json({ message: `No products found with tag ${tag}` });
	}

	res.status(200).json({
		success: true,
		data: products
	});
});
export const getProductsByRating = expressAsyncHandler(async (req, res) => {
	const { rating } = req.query;

	if (!rating) {
		return res.status(400).json({ message: 'Rating is required' });
	}

	const products = await productModel.find({ rating: { $gte: rating } });

	if (products.length === 0) {
		return res
			.status(404)
			.json({ message: 'No products found with this rating' });
	}

	res.status(200).json({
		success: true,
		data: products
	});
});
export const getProductsByStockAvailability = expressAsyncHandler(
	async (req, res) => {
		const { inStock } = req.query;

		if (inStock === undefined) {
			return res.status(400).json({ message: 'In-stock status is required' });
		}

		const products = await productModel.find({ stock: { $gt: 0 } });

		if (inStock === 'false') {
			products = await productModel.find({ stock: 0 });
		}

		if (products.length === 0) {
			return res
				.status(404)
				.json({ message: 'No products found with this stock availability' });
		}

		res.status(200).json({
			success: true,
			data: products
		});
	}
);
export const getProductsBySearch = expressAsyncHandler(async (req, res) => {
	const { search } = req.query;

	if (!search) {
		return res.status(400).json({ message: 'Search term is required' });
	}

	const products = await productModel.find({
		$or: [
			{ name: { $regex: search, $options: 'i' } },
			{ description: { $regex: search, $options: 'i' } }
		]
	});

	if (products.length === 0) {
		return res
			.status(404)
			.json({ message: 'No products found matching the search term' });
	}

	res.status(200).json({
		success: true,
		data: products
	});
});
export const getProductsByMultipleCriteria = expressAsyncHandler(
	async (req, res) => {
		const { category, subcategory, color, minPrice, maxPrice } = req.query;

		const filter = {};

		if (category) {
			filter.category = category;
		}
		if (subcategory) {
			filter.subcategory = subcategory;
		}
		if (color) {
			filter.color = color;
		}
		if (minPrice && maxPrice) {
			filter.price = { $gte: minPrice, $lte: maxPrice };
		}

		const products = await productModel.find(filter);

		if (products.length === 0) {
			return res
				.status(404)
				.json({ message: 'No products found matching the criteria' });
		}

		res.status(200).json({
			success: true,
			data: products
		});
	}
);
export const getProductsByPagination = expressAsyncHandler(async (req, res) => {
	const { page = 1, limit = 10 } = req.query;

	const skip = (page - 1) * limit;
	const products = await productModel.find({}).skip(skip).limit(Number(limit));

	const totalProducts = await productModel.countDocuments();
	const totalPages = Math.ceil(totalProducts / limit);

	res.status(200).json({
		success: true,
		data: products,
		pagination: {
			totalProducts,
			totalPages,
			currentPage: Number(page),
			limit: Number(limit)
		}
	});
});
export const getProductsBySorting = expressAsyncHandler(async (req, res) => {
	const { sortBy = 'name', order = 'asc' } = req.query;

	const sortOrder = order === 'asc' ? 1 : -1;
	const products = await productModel.find({}).sort({ [sortBy]: sortOrder });

	if (products.length === 0) {
		return res.status(404).json({ message: 'No products found' });
	}

	res.status(200).json({
		success: true,
		data: products
	});
});
export const getProductsByAvailability = expressAsyncHandler(
	async (req, res) => {
		const { available } = req.query;

		if (available === undefined) {
			return res
				.status(400)
				.json({ message: 'Availability status is required' });
		}

		const products = await productModel.find({
			stock: available ? { $gt: 0 } : 0
		});

		if (products.length === 0) {
			return res
				.status(404)
				.json({ message: 'No products found with this availability status' });
		}

		res.status(200).json({
			success: true,
			data: products
		});
	}
);

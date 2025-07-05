import expressAsyncHandler from 'express-async-handler';
import { Hash } from '../../utils/Hash/index.js';
import productModel from './product.model.js';

export const createProduct = expressAsyncHandler(async (req, res, next) => {
	const {
		name,
		title,
		description,
		price,
		category,
		images,
		sizes,
		materials,
		tags,
		inStock,
		colors
	} = req.body;

	if (
		!name ||
		!title ||
		!description ||
		!price ||
		!category ||
		!images ||
		!sizes ||
		!colors
	) {
		return next(
			new Error(
				'Required fields are missing: name, title, description, price, category, images, sizes, colors'
			)
		);
	}

	const existingProduct = await productModel.findOne({ name });
	if (existingProduct) {
		return res.status(400).send({ message: 'Product already exists' });
	}

	const product = await productModel.create({
		name,
		title,
		description,
		price,
		category,
		images,
		sizes,
		materials,
		tags,
		inStock,
		colors
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

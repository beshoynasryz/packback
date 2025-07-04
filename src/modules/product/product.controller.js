import express from 'express';
import {
	createProduct,
	getProductById,
	updateProduct,
	deleteProduct
} from './product.service.js';
import e from 'express';

const router = express.Router();
router.post('/create', createProduct);
router.get('/:id', getProductById);
export const productRoutes = router;

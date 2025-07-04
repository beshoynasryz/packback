import express from 'express';
import {
	createProduct,
	getProductById,
	updateProduct,
	deleteProduct
} from './product.service.js';


const router = express.Router();
router.post('/create', createProduct);
router.get('/:id', getProductById);
export const productRoutes = router;

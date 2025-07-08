import express from 'express';
import {
	createProduct,
	getProductById,
	updateProduct,
	deleteProduct,
	getAllProducts,
	getProductsByCategory
} from './product.service.js';


const router = express.Router();
router.post('/create', createProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/', getAllProducts);
router.get('/category/:category', getProductsByCategory);

export const productRoutes = router;

import express from 'express';
import { auth } from '../../middlewares/Auth.middleware.js';
import { isAuthorized } from '../../middlewares/Authorization.middleware.js';
import {
	createProduct,
	getProductById,
	updateProduct,
	deleteProduct,
	getAllProducts,
	getProductsByCategory
} from './product.service.js';


const router = express.Router();
router.post('/create', auth, isAuthorized('admin'), createProduct);
router.get('/:id', auth, getProductById);
router.put('/:id', auth, isAuthorized('admin'), updateProduct);
router.delete('/:id', auth, isAuthorized('admin'), deleteProduct);
router.get('/', auth, getAllProducts);
router.get('/category/:category', auth, getProductsByCategory);

export const productRoutes = router;

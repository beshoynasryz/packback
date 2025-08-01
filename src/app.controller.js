import connectDB from './config/DB/dbConnection.js';
import { productRoutes } from './modules/product/product.controller.js';
import authRoutes from './modules/auth/auth.routes.js';
import orderRoutes from './modules/order/order.routes.js';
import ratingRoutes from './modules/rating/rating.routes.js';
import { globalErrorHandler } from './utils/globalErrorHandling/index.js';

function bootstrap(app, express) {
	connectDB();

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use('/api/v1/auth', authRoutes);
	app.use('/api/v1/products', productRoutes);
	app.use('/api/v1/orders', orderRoutes);
	app.use('/api/v1/ratings', ratingRoutes);

	app.get('/', (req, res) => {
		res.send('🚀 BNE Packback e-commerce API is running');
	});
	app.use(globalErrorHandler);
}

export default bootstrap;

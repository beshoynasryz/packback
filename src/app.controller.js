import connectDB from './config/DB/dbConnection.js';
import { productRoutes } from './modules/product/product.controller.js';
import { globalErrorHandler } from './utils/globalErrorHandling/index.js';

function bootstrap(app, express) {
	connectDB();

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.get('/', (req, res) => {
		res.send('🚀 BNE Packback e-commerce API is running');
	});
	app.use(globalErrorHandler)
}

export default bootstrap;

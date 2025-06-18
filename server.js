import dotenv from 'dotenv';
dotenv.config({ path: path.resolve('src/config/.env') });

import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

bootstrap(app, express);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
app.use(express.urlencoded({ extended: true }));

function bootstrap(app, express) {
	app.use(express.json());

	app.get('/', (req, res) => {
		res.send('BNE packback e-commerce API is running');
	});
}

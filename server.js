import express from "express";
import bootstrap from "./src/app.Controller.js";
import { configDotenv } from "dotenv";
const app = express();
configDotenv();
const port = process.env.PORT || 3000;

bootstrap(app, express);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

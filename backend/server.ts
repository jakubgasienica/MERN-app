import express, { Express, RequestHandler, json, urlencoded } from "express";

import colors from "colors";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorMiddleware";
import { connectDB } from "./config/db";
import bodyParser from "body-parser";
const PORT = process.env.PORT || 5000;

const app: Express = express();

connectDB();

app.use(bodyParser);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/api/users", require("./routes/userRoutes"));

// app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

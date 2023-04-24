import mongoose from "mongoose";
import * as dotenv from "dotenv";
import "colors";

dotenv.config();

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI ?? "");
		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
	} catch (error: any) {
		console.log(`Error: ${error.message}`);
		process.exit(1);
	}
};

export { connectDB };

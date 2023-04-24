import { Response } from "express-serve-static-core";

type Error = {
	message: string;
	stack: number;
};

const errorHandler = (err: Error, req: Request, res: Response, next: any) => {
	const statusCode = res.statusCode ? res.statusCode : 500;
	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

export { errorHandler };

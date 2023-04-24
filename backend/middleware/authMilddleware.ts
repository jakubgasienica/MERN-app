import jwt from "jsonwebtoken";

import User from "../models/userModel";

import { NextFunction, Request, Response } from "express-serve-static-core";

const protect = async (req: Request, res: Response, next?: NextFunction) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET ?? " ") as {
				id: string;
			};
			const foundUser = await User.findById(decoded.id).select("-password");
			next?.();
		} catch (error) {
			console.log(error);
			res.status(401);
			throw new Error("not authorized");
		}
	}
	if (!token) {
		res.status(401);
		throw new Error("not authrized");
	}
};

export { protect };

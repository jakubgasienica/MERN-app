import { Request, Response } from "express-serve-static-core";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/userModel";

const registerUser = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please include all fields");
	}

	// find if user already exists
	const userExits = await User.findOne({ email });

	if (userExits) {
		res.status(400);
		throw new Error("User already exists");
	}
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// create user
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id.toString()),
		});
	} else {
		res.status(400);
		throw new Error("invalid user data");
	}
};
const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id.toString()),
		});
	} else {
		res.status(401);
		throw new Error("Invalid credentials");
	}
};

const getMe = async (req: Request, res: Response) => {
	const user = {
		id: req.body.user._id,
		email: req.body.user.email,
		name: req.body.user.name,
	};
	res.status(200).json(user);
};

const generateToken = (id: string) => {
	return jwt.sign({ id }, process.env.JWT_SECRET ?? "", {
		expiresIn: "30d",
	});
};

export { registerUser, loginUser, getMe };

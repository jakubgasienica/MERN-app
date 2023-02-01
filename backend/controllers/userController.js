const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
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
		});
	} else {
		res.status(400);
		throw new error("inwalid user data");
	}
});
const loginUser = asyncHandler(async (req, res) => {
	res.send("Login Route");
});

module.exports = {
	registerUser,
	loginUser,
};

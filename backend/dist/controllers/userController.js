"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please include all fields");
    }
    // find if user already exists
    const userExits = await userModel_1.default.findOne({ email });
    if (userExits) {
        res.status(400);
        throw new Error("User already exists");
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(password, salt);
    // create user
    const user = await userModel_1.default.create({
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
    }
    else {
        res.status(400);
        throw new Error("invalid user data");
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel_1.default.findOne({ email });
    if (user && (await bcryptjs_1.default.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id.toString()),
        });
    }
    else {
        res.status(401);
        throw new Error("Invalid credentials");
    }
};
exports.loginUser = loginUser;
const getMe = async (req, res) => {
    const user = {
        id: req.body.user._id,
        email: req.body.user.email,
        name: req.body.user.name,
    };
    res.status(200).json(user);
};
exports.getMe = getMe;
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET ?? "", {
        expiresIn: "30d",
    });
};

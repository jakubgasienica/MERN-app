"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET ?? " ");
            const foundUser = await userModel_1.default.findById(decoded.id).select("-password");
            next?.();
        }
        catch (error) {
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
exports.protect = protect;

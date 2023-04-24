import express from "express";
import { Router } from "express";
import { registerUser, loginUser, getMe } from "../controllers/userController";
import { protect } from "../middleware/authMilddleware";

const router = Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;

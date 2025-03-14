import express from "express";
import { login, signup } from "../controllers/authControllers.js";
const router = express.Router();

//auth routes
router.post("/signup", signup);
router.post("/login", login);

export { router as Router };

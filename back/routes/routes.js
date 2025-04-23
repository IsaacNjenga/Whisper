import express from "express";
import { login, signup } from "../controllers/authControllers.js";
import { chatWithCohere } from "../controllers/chatbotController.js";
const router = express.Router();

//auth routes
router.post("/signup", signup);
router.post("/login", login);


//chatbot route
router.post("/chatbot",chatWithCohere);

export { router as Router };

import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createCategory, getCategories } from "../controllers/category.controller.js";

const router = Router();

router.route("/create").post(verifyJWT, createCategory);
router.route("/").get(getCategories);

export default router;

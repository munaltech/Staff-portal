import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addService, getServices } from "../controllers/service.controller.js";

const router = Router();

router.route("/add").post(verifyJWT, addService);
router.route("/").get(getServices);

export default router;

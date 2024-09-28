import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addSubscription, getSubscriptions, getSubscription, updateSubscription } from "../controllers/subscription.controller.js";

const router = Router();

router.route("/add").post(verifyJWT, addSubscription);
router.route("/update/:id").put(verifyJWT, updateSubscription);
router.route("/").get(verifyJWT, getSubscriptions);
router.route("/subscription/:id").get(verifyJWT, getSubscription);


export default router;

import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addService, getServices, getService, updateService } from "../controllers/service.controller.js";

const router = Router();

router.route("/add").post(verifyJWT, addService);
router.route("/update/:id").put(verifyJWT, updateService);
router.route("/").get(getServices);
router.route("/:id").get(verifyJWT, getService);


export default router;

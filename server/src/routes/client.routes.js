import { Router } from "express";
import {
    createClient,
    getClients,
    getClientDetails,
    updateClient
} from "../controllers/client.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create").post(createClient);
router.route("/").get(getClients);
router.route("/:id").get(verifyJWT, getClientDetails);
router.route("/update/:id").put(verifyJWT, updateClient);

export default router;

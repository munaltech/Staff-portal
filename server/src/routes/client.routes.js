import { Router } from "express";
import { createClient, getClients, getClientDetails } from "../controllers/client.controller.js";

const router = Router();

router.route("/create").post(createClient);
router.route("/").get(getClients);
router.route("/:id").get(getClientDetails);


export default router;
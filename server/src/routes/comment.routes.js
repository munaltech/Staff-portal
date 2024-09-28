import { Router } from "express";
import { addComment, getComments } from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/:id").post(verifyJWT, addComment);
router.route("/:id").get(verifyJWT, getComments);

export default router;

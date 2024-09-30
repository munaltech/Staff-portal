import { Router } from "express";
import {
    createUser,
    updateUser,
    getUsers,
    deleteUser,
    fetchUser,
    login,
    logout,
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create").post(createUser);
router.route("/update/:id").put(updateUser);
router.route("/").get(getUsers);
router.route("/:id").delete(deleteUser);
router.route("/:id").get(verifyJWT,fetchUser);

router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);

export default router;

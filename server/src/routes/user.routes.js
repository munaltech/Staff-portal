import { Router } from "express";
import {
    createUser,
    updateUser,
    getUsers,
    deleteUser,
    fetchUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/create").post(createUser);
router.route("/update/:id").put(updateUser);
router.route("/").get(getUsers);
router.route("/:id").delete(deleteUser);
router.route("/:id").get(fetchUser);

export default router;

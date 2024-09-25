import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";

const createUser = asyncHandler(async (req, res) => {

    const { full_name, role, email, phone_number, username, password } =
        req.body;

    if (
        !full_name ||
        !role ||
        !email ||
        !phone_number ||
        !username ||
        !password
    ) {
        throw new ApiError(400, "All fields are required");
    }

    try {
        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) {
            throw new ApiError(409, "User already exists");
        }

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            throw new ApiError(409, "Email already exists");
        }
    } catch (error) {
        console.error(error);
        throw new ApiError(500, "Database Error");
    }

    const user = await User.create({
        full_name,
        role,
        email,
        phone_number,
        username,
        password,
    });

    const createdUser = await User.findByPk(user.id, {
        attributes: { exclude: ["password", "refresh_token"] },
    });

    if (!createdUser) {
        throw new ApiError(500, "Failed to create user");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, createdUser, "User created successfully"));
});

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { full_name, role, email, phone_number, username, password } =
        req.body;
    const user = await User.findByPk(id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.full_name = full_name;
    user.role = role;
    user.email = email;
    user.phone_number = phone_number;
    user.username = username;
    user.password = password;
    await user.save();

    const updatedUser = await User.findByPk(id, {
        attributes: { exclude: ["password", "refresh_token"] },
    });

    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "User updated successfully"));
});

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ["password", "refresh_token"] },
    });
    return res
        .status(200)
        .json(new ApiResponse(200, users, "Users fetched successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    await user.destroy();
    return res
        .status(200)
        .json(new ApiResponse(200, null, "User deleted successfully"));
});

const fetchUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const fetchedUser = await User.findByPk(user.id, {
        attributes: { exclude: ["password", "refresh_token"] },
    });
    return res
        .status(200)
        .json(new ApiResponse(200, fetchedUser, "User fetched successfully"));
});

export { createUser, updateUser, getUsers, deleteUser, fetchUser };

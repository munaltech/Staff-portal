import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";

const createUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    
    const { full_name, role, email, phone_number, username, password } =
        req.body;

    if (
        [full_name, role, email, phone_number, username, password].some(
            (field) => field?.trim() === ""
        )
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

export { createUser };

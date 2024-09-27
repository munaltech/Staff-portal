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

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { access_token, refresh_token } = await generateAccessAndRefreshTokens(
        user.id
    ) ;

    const loggedInUser = await User.findByPk(user.id, {
        attributes: { exclude: ["password", "refresh_token"] },
    });

    const options = {
        httpOnly: true,
        secure: true,
    };
    

    return res
        .status(200)
        .cookie("access_token", access_token, options)
        .cookie("refresh_token", refresh_token, options)
        .json(new ApiResponse(200, { user: loggedInUser, access_token, refresh_token }, "User logged in successfully"));
});

const logout = asyncHandler(async (req, res) => {
    await User.update({ refresh_token: null }, { where: { id: req.user.id } });

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("access_token", options)
        .clearCookie("refresh_token", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const generateAccessAndRefreshTokens = async(userId) => {
    try{
        const user = await User.findByPk(userId);
        const access_token = user.generateAccessToken();
        const refresh_token = user.generateRefreshToken();

        user.refresh_token = refresh_token;
        await user.save();

        return { access_token, refresh_token };
    } catch(error) {
        console.log(error.message);
        throw new ApiError(500, "Error Generating Tokens");

    }
}



export { createUser, updateUser, getUsers, deleteUser, fetchUser, login, logout };

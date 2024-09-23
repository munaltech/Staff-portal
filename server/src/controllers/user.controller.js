import { ApiRespose } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import User from '../models/user.model';

const createUser = asyncHandler(async (req, res) => {
    const { full_name, role, email, phone_number, username, password } =
        req.body;

    if (
        [full_name, role, email, phone_number, username, password].some(
            (field) => field?.trim() === ''
        )
    ) {
        throw new ApiError(400, 'All fields are required');
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
        throw new ApiError(409, 'User already exists');
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
        throw new ApiError(409, 'Email already exists');
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
        attributes: { exclude: ['password', 'refresh_token'] },
    });

    if (!createdUser) {
        throw new ApiError(500, 'Failed to create user');
    }

    return res
        .status(201)
        .json(new ApiRespose(201, newUser, 'User created successfully'));
});

export default { createUser };

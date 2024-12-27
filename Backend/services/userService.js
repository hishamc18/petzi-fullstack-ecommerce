const User = require('../models/userModel');
const CustomError = require('../utils/customError');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');

// Register Service
exports.registerUserService = async ({ username, email, password }) => {
    // Check if email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new CustomError('Email already registered', 400);

    try {
        // Create new user
        const user = await User.create({ username, email, password });

        // Return user details without password
        return {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };
    } catch (err) {
        // Handle MongoDB unique key violation
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            throw new CustomError(`The ${field} "${err.keyValue[field]}" is already taken. Please use a different one.`, 400);
        }

        // If an unexpected error occurs, log it and throw a generic error
        console.error('Registration error:', err);
        throw new CustomError('Something went wrong during registration. Please try again later.', 500);
    }
};

// Login Service (No changes here)
exports.loginUserService = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new CustomError('Invalid email or password', 401);

    if (user.isBlocked) {
        throw new CustomError('Your account is blocked. Please contact Admin.', 403);
    }

    // Validate password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new CustomError('Invalid email or password', 401);

    // Generate tokens
    const accessToken = generateAccessToken({ id: user._id, role: user.role, email: user.email });
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role, email: user.email });

    return {
        accessToken,
        refreshToken,
        user: { username: user.username, email: user.email, role: user.role },
    };
};


// Logout Service
exports.logoutUserService = () => {
    return true;
};

// logined user details
exports.getUserDetails = async (id) => {
    const user = await User.findById(id).select('username');
    return user;
};


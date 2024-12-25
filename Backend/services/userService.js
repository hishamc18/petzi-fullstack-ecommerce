const User = require('../models/userModel');
const CustomError = require('../utils/customError');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');

// Register Service
exports.registerUserService = async ({ username, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new CustomError('Email already registered', 400);

    try {
        const user = await User.create({ username, email, password });
        return { id: user._id, username: user.username, email: user.email, role: user.role };
    } catch (err) {
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            throw new CustomError(`The ${field} "${err.keyValue[field]}" is already taken. Please use a different one.`, 400);
        }
        throw err; 
    }
};

// Login Service
exports.loginUserService = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new CustomError('Invalid email or password', 401);

    if (user.isBlocked) {
        throw new CustomError('Your account is blocked. Please contact Admin.', 403);
    }

    //password validation
    const isMatch = await user.matchPassword(password);
    if (!isMatch) throw new CustomError('Invalid email or password', 401);

    const accessToken = generateAccessToken({ id: user._id, role: user.role, email: user.email });
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role, email: user.email });

    return {
        accessToken,
        refreshToken,
        user: {  username: user.username, email: user.email, role: user.role },
    };
};
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/customError');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  try {
    if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return next(new CustomError('Not authorized, no token provided', 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return next(new CustomError('User not found', 404));
    }

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(new CustomError('Access token expired, please refresh your token', 401));
    } else {
      return next(new CustomError('Not authorized, token invalid', 401));
    }
  }
};




// Admin middleware
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    throw new CustomError('Access denied, only admins can access this', 403);
  }
};

module.exports = { protect, isAdmin };
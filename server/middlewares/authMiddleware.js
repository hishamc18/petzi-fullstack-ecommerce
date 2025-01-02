const jwt = require('jsonwebtoken');
const CustomError = require('../utils/customError');
const User = require('../models/userModel');

// const protect = async (req, res, next) => {
//   let token;

//   try {
//     if (req.cookies && req.cookies.accessToken) {
//       token = req.cookies.accessToken;
//     }

//     if (!token) {
//       // return next(new CustomError('Not authorized, Please Login', 401));
//       return res.status(401).json({ isAuthenticated: false, message: 'Not authenticated' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');

//     if (!req.user) {
//       return next(new CustomError('User not found', 404));
//     }

//     next();
//   } catch (err) {
//     if (err.name === 'TokenExpiredError') {
//       return next(new CustomError('Access token expired, please refresh your token', 401));
//     } else {
//       return next(new CustomError('Not authorized, token invalid', 401));
//     }
//   }
// };


const protect = async (req, res, next) => {
  let token;

  try {
    // Check for the accessToken in cookies
    if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    // If no token is found, return unauthenticated response
    if (!token) {
      return res.status(401).json({ isAuthenticated: false, message: 'Not authenticated' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user details using the decoded token data
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(404).json({ isAuthenticated: false, message: 'User not found' });
    }

    // User is authenticated, proceed to the next middleware or route handler
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ isAuthenticated: false, message: 'Access token expired, please refresh your token' });
    } else {
      return res.status(401).json({ isAuthenticated: false, message: 'Not authorized, token invalid' });
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
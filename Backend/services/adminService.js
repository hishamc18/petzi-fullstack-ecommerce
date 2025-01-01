const User = require('../models/userModel');
const Order = require('../models/orderModel');
const CustomError = require('../utils/customError');

//get all users
exports.getAllUsers = async (page, limit) => {
  const skip = (page - 1) * limit;
  const users = await User.find({role: 'user'}).skip(skip).limit(limit).select('-password');
  const totalUsers = await User.countDocuments({role: 'user'});

  return {
    users,
    totalUsers
  };
};

// get user by id
exports.getUserByID = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user || user.role == 'admin') {
    throw new CustomError('User not found', 404);
  }
  return user;
};

//user block & unblock
exports.blockAndUnblockUser = async (id) => {
    const user = await User.findById(id);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    //toggling user block status
    user.isBlocked = !user.isBlocked;
    await user.save();
    return user;
  };
  
//get all orders
exports.getAllOrders = async (page, limit) => {
  const skip = (page - 1) * limit;
  const orders = await Order.find().skip(skip).limit(limit).populate('userId');
  const totalOrders = await Order.countDocuments();

  return {
    orders,
    currentPage: page,
    totalPages: Math.ceil(totalOrders / limit),
  };
};

//totoal revenue
exports.getTotalRevenue = async () => {
  const totalRevenue = await Order.aggregate([
    { $group: { _id: null, total: { $sum: '$totalAmount' } } },
  ]);
  return totalRevenue[0]?.total || 0;
};

const adminService = require('../services/adminService');
const asyncHandler = require('../middlewares/asyncHandler');

//get all users
exports.getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query; 
  const users = await adminService.getAllUsers(page, limit);
  res.status(200).json(users);
});

//get user by id
exports.getUserByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await adminService.getUserByID(id);
  res.status(200).json(user);
});

//block and unblock
exports.blockAndUnblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedUser = await adminService.blockAndUnblockUser(id);
  res.status(200).json(updatedUser);
});

//get all orders
exports.getAllOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const orders = await adminService.getAllOrders(page, limit);
  res.status(200).json(orders);
});

//total revenue
exports.getTotalRevenue = asyncHandler(async (req, res) => {
  const totalRevenue = await adminService.getTotalRevenue();
  res.status(200).json({ totalRevenue });
});

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {protect, isAdmin} = require('../middlewares/authMiddleware');

router.get('/users', protect, isAdmin, adminController.getAllUsers);
router.get('/users/:id', protect, isAdmin, adminController.getUserByID);
router.put('/users/:id/block-unblock', protect, isAdmin, adminController.blockAndUnblockUser); 
router.get('/orders', protect, isAdmin, adminController.getAllOrders);
router.get('/revenue', protect, isAdmin, adminController.getTotalRevenue);

module.exports = router;

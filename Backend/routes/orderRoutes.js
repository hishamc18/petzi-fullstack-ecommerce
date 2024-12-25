// const express = require('express');
// const router = express.Router();
// const orderController = require('../controllers/orderController');
// const {protect} = require('../middlewares/authMiddleware');

// // order routes
// router.post('/orders', protect, orderController.createOrder); 
// router.get('/orders', protect, orderController.getUserOrders);
// router.put('/orders/:orderId/cancel', protect, orderController.cancelOrder);

// module.exports = router;





const express = require('express');
const { createOrder, getUserOrders, cancelOrder } = require('../controllers/orderController');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware'); // Middleware to protect routes

// Create a new order
router.post('/orders', protect, createOrder);

// Get all orders for the user (paginated)
router.get('/orders', protect, getUserOrders);

// Cancel an order
router.put('/orders/:orderId/cancel', protect, cancelOrder);

module.exports = router;

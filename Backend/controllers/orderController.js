const asyncHandler = require('../middlewares/asyncHandler');
const orderService = require('../services/orderService');

// Create a new order
// const createOrder = asyncHandler(async (req, res) => {
//   const userId = req.user._id; 
//   const { items, shippingAddress, paymentMethod } = req.body;

//   // Call the service to create the order and handle Stripe payment if necessary
//   const { order, clientSecret } = await orderService.createOrder(userId, items, shippingAddress, paymentMethod);

//   // If payment method is Stripe, return the clientSecret to frontend for payment processing
//   if (paymentMethod === 'Stripe') {
//     return res.status(201).json({
//       message: 'Order created successfully, please complete the payment',
//       order,
//       clientSecret,
//     });
//   }

//   // If no Stripe payment method, simply return the order creation response
//   res.status(201).json({
//     message: 'Order created successfully',
//     order,
//   });
// });

const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Extract user ID from authenticated user
  const { shippingAddress, paymentMethod } = req.body;

  // Call the service to create the order and handle Stripe payment if necessary
  const { order, clientSecret } = await orderService.createOrder(userId, shippingAddress, paymentMethod);

  // If payment method is Stripe, return the clientSecret to frontend for payment processing
  if (paymentMethod === 'Stripe') {
    return res.status(201).json({
      message: 'Order created successfully, please complete the payment',
      order,
      clientSecret,
    });
  }

  // If no Stripe payment method, simply return the order creation response
  res.status(201).json({
    message: 'Order created successfully',
    order,
  });
});


// Get all orders for a user
const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 10 } = req.query;
  const orders = await orderService.getUserOrders(userId, page, limit);
  res.status(200).json({ orders });
});

// Cancel order for user
const cancelOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId;  

  // Call service to cancel the order
  const cancelledOrder = await orderService.cancelOrder(orderId);
  res.status(200).json({
    message: 'Order has been cancelled',
    order: cancelledOrder,
  });
});

module.exports = {
  createOrder,
  getUserOrders,
  cancelOrder,
};

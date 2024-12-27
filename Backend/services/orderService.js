// const Order = require('../models/orderModel');
// const Product = require('../models/productModel');
// const CustomError = require('../utils/customError');

// // Creating order
// const createOrder = async (userId, items, shippingAddress, paymentMethod) => {
//   const orderItems = [];
//   let totalAmount = 0;

//   for (const item of items) {
//     const product = await Product.findById(item.productId);
//     if (!product) throw new CustomError('Product not found', 404);

//     if (product.stock < item.quantity) {
//       throw new CustomError('Not enough stock for product: ' + product.name, 400);
//     }

//     totalAmount += (product.price).toFixed(0) * item.quantity;
//     orderItems.push({ productId: product._id, quantity: item.quantity });
//   }
//   const newOrder = new Order({
//     userId,
//     items: orderItems,
//     shippingAddress,
//     paymentMethod,
//     totalAmount,
//   });
//   await newOrder.save();
//   return newOrder;
// };

// // Get all orders for a user
// const getUserOrders = async (userId, page = 1, limit = 10) => {
//   const skip = (page - 1) * limit;
//   const orders = await Order.find({ userId })
//     .populate('items.productId')
//     .skip(skip)
//     .limit(limit);
//   if (!orders.length) throw new CustomError('No orders found for this user', 404);
//   return orders;
// };


// //cancel Order for user
// const cancelOrder = async (orderId) => {
//   const order = await Order.findById(orderId);
//   if (!order) {
//     throw new CustomError('Order not found', 404);
//   }

//   if (order.status !== 'pending') {
//     throw new CustomError('Order cannot be cancelled', 400);
//   }

//   order.status = 'cancelled';
//   await order.save();
//   return order;
// };

// module.exports = {
//   createOrder,
//   getUserOrders,
//   cancelOrder,
// };














const Order = require('../models/orderModel');
const Cart = require('../models/cartModel')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const CustomError = require('../utils/customError');



const createOrder = async (userId, shippingAddress, paymentMethod) => {
  // Fetch user's cart
  const cart = await Cart.findOne({ userId }).populate('items.productId'); 

  if (!cart || cart.items.length === 0) {
    throw new CustomError('Cart is empty', 400);
  }

  let totalAmount = 0;
  const orderItems = [];

  // Validate stock and calculate the total amount
  for (const cartItem of cart.items) {
    const product = cartItem.productId;

    if (!product) throw new CustomError('Product not found', 404);

    if (product.stock < cartItem.quantity || product.isDeleted == true) {
      throw new CustomError('Not enough stock for product or product was deleted: ' + product.name, 400);
    }

    totalAmount += product.price * cartItem.quantity;
    orderItems.push({ productId: product._id, quantity: cartItem.quantity });

    // Deduct stock from the product
    product.stock -= cartItem.quantity;
    await product.save();
  }

  // Create a new order
  const newOrder = new Order({
    userId,
    items: orderItems,
    shippingAddress,
    paymentMethod,
    totalAmount,
    status: paymentMethod === 'Stripe' ? 'pending' : 'placed', // Set status based on payment method
  });

  await newOrder.save();

  // Clear the user's cart after creating the order
  cart.items = [];
  await cart.save();

  // If the payment method is Stripe, create a payment intent
  if (paymentMethod === 'Stripe') {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // amount in cents
      currency: 'inr', // Adjust currency as per your needs
      metadata: { order_id: newOrder._id.toString() }, // Attach the order ID as metadata
    });

    // Store the payment intent ID in the order model
    newOrder.stripePaymentIntentId = paymentIntent.id;
    await newOrder.save();

    return { order: newOrder, clientSecret: paymentIntent.client_secret };
  }

  return { order: newOrder };
};


// Get all orders for a user (with pagination)
const getUserOrders = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const orders = await Order.find({ userId })
    .populate('items.productId')
    .skip(skip)
    .limit(limit);

  if (!orders.length) throw new CustomError('No orders found for this user', 404);

  return orders;
};

// Cancel an order for a user
const cancelOrder = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new CustomError('Order not found', 404);
  }

  if (order.status !== 'pending') {
    throw new CustomError('Order cannot be cancelled', 400);
  }

  // Set the order status to "cancelled"
  order.status = 'cancelled';
  await order.save();
  
  return order;
};

module.exports = {
  createOrder,
  getUserOrders,
  cancelOrder,
};

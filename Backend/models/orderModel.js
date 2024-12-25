const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      set: v => Math.round(v)
    },
    expectedDeliveryDate: {
      type: Date,
      default: function () {
        return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 
      },
    },
    paymentDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },

    // New fields for Stripe integration
    stripePaymentIntentId: {
      type: String, // Stores the Stripe payment intent ID
    },
    stripePaymentStatus: {
      type: String,
      enum: ['pending', 'succeeded', 'failed', 'canceled'],
      default: 'pending', // Initially pending, later updated based on payment status
    },
    stripeChargeId: {
      type: String, // Store the Stripe charge ID after successful payment
    },
    stripeReceiptUrl: {
      type: String, // URL to the Stripe receipt for the transaction
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);

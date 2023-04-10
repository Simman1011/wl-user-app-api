const asyncHandler = require("express-async-handler");
const {ObjectId} = require('mongodb');

const Order = require('../models/order_model');
const Product = require('../models/product_model');

const addOrder = asyncHandler(async (req, res) => {
  const { userId, addressId, items, deliveryDate } = req.body;

  // Check if products exist
  const productIds = items.map(item => item.productId);
  const products = await Product.find({ _id: { $in: productIds } });

  if (products.length !== productIds.length) {
    return res.status(400).json({ error: 'Products do not exist' });
  }

  // Calculate order total and create order object
  let total = 0;
  const orderItems = items.map(item => {
    const product = products.find(p => p._id.toString() === item.productId);
    const price = product.offerPrice;
    const quantity = item.quantity;
    const subTotal = price * quantity;
    total += subTotal;
    return { product: product._id, quantity, price, subTotal };
  });

  const order = new Order({
    user: new ObjectId(userId),
    address: new ObjectId(addressId),
    items: orderItems,
    total: total,
    deliveryAt: new Date(deliveryDate)
  });

  // Save order object to database
  try {
    const savedOrder = await order.save();
    return res.status(200).json(savedOrder);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
})

module.exports = { addOrder }

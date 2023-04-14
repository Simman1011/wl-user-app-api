const asyncHandler = require("express-async-handler");
const {ObjectId} = require('mongodb');

const Order = require('../models/order_model');
const Product = require('../models/product_model');
const Coupon = require('../models/coupon_model');

const { validateCoupon } = require("../helper/index")

const addOrder = asyncHandler(async (req, res) => {
  const { userId, addressId, items, deliveryDate, firstOrder, couponCode } = req.body;

  // Check if products exist
  let productIds = items.map(item => item.productId);
  let products = await Product.find({ _id: { $in: productIds } });

  if (products.length !== productIds.length) {
    return res.status(400).json({ error: 'Products do not exist' });
  }

  // Calculate order total and create order object
  let total = 0;
  let discount = '';
  const orderItems = items.map(item => {
    const product = products.find(p => p._id.toString() === item.productId);
    const price = product.offerPrice;
    const quantity = item.quantity;
    const subTotal = price * quantity;
    total += subTotal;
    return { product: product._id, quantity, price, subTotal };
  });

  if (firstOrder && couponCode != '') {
    let prevOrder = await Order.find({user: { $in: userId }})
    if (prevOrder?.length === 0) {
      let firstOrderDiscount = await Coupon.findOne({status: 'Y', type: 'B'});
      total -= firstOrderDiscount?.worth;
      discount = 'First Order';
    }else{
      return res.status(400).json({ error: 'This not user first order' });
    }
  }

  if (couponCode) {
    let coupon = await validateCoupon(couponCode, total)
    console.log(total, 'coupon');
    if (coupon?.error) {
      return res.status(400).json(coupon);
    }else{
      total -= coupon.data?.worth;
      discount = coupon.data?.code;
    }
  }

  const order = new Order({
    user: new ObjectId(userId),
    address: new ObjectId(addressId),
    items: orderItems,
    total: total,
    deliveryAt: new Date(deliveryDate),
    offerOrCoupon: discount
  });

    return res.status(200).json(order);

  // Save order object to database
  // try {
  //   const savedOrder = await order.save();
  //   return res.status(200).json(savedOrder);
  // } catch (err) {
  //   return res.status(500).json({ error: err });
  // }
})

module.exports = { addOrder }

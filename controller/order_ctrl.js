const asyncHandler = require("express-async-handler");
const {ObjectId} = require('mongodb');

const Order = require('../models/order_model');
const Product = require('../models/product_model');
const Coupon = require('../models/coupon_model');

const { validateCoupon, validateReffer } = require("../helper/index")

const getOrders = asyncHandler(async (req, res) =>{
  let { user } = req.params
  let { limit, skip } = req.query;
  try{
      let find = await Order.find({user: {$in: user}}).limit(limit).skip(skip)

      res.json({
          message: "Order(s) get successfully",
          data: find
      })
  }catch(error){
      throw new Error(error)
  }
})

const addOrder = asyncHandler(async (req, res) => {
  const { userId, addressId, items, deliveryDate, firstOrder, offerCode } = req.body;

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

  if (firstOrder && offerCode != '') {
    let prevOrder = await Order.find({user: { $in: userId }})
    if (prevOrder?.length === 0) {
      let firstOrderDiscount = await Coupon.findOne({status: 'Y', type: 'B'});
      total -= firstOrderDiscount?.worth;
      discount = 'First Order';
    }else{
      return res.status(400).json({ error: 'This not user first order' });
    }
  }

  if (offerCode) {
    let offer;
    if (offerCode.startsWith("WLREFFER")) {
      offer = await validateReffer(offerCode, total, userId)
      if (offer?.error) {
        return res.status(400).json(offer);
      }else{
        total -= offer.data?.worth;
        discount = offerCode;
        try {
          await Coupon.findOneAndUpdate({type: 'RB'}, {$push:{"validUsers": offer.user}});
        } catch (err) {
          return res.status(500).json({ error: err });
        }
      }
    }else{
      offer = await validateCoupon(offerCode, total, userId)
      if (offer?.error) {
        return res.status(400).json(offer);
      }else{
        total -= offer.data?.worth;
        discount = offer.data?.code;
      }
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

  // Save order object to database
  try {
    const savedOrder = await order.save();
    return res.status(200).json(savedOrder);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
})

const reviewDP = asyncHandler(async (req, res) => {
  let { orderId } = req.params
  let review = req.body;

  try {
    await Order.findByIdAndUpdate(orderId, {dpReview: review}, {new: true});
    res.json({message: "Review added successfully"})
  } catch (err) {
    throw new Error(err)
  }

})

module.exports = { getOrders, addOrder, reviewDP }

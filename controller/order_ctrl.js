const asyncHandler = require("express-async-handler");
const {ObjectId} = require('mongodb');

const Order = require('../models/order_model');
const Product = require('../models/product_model');
const Coupon = require('../models/coupon_model');
const Address = require('../models/address_model');
const DeliveryPartner = require('../models/deliveryPartner_model');

const { validateCoupon, validateReffer } = require("../helper/index")

const getOrders = asyncHandler(async (req, res) =>{
  let { limit, skip } = req.query;
  try{
      let find = await Order.find({user: {$in: req.user.id}}).limit(limit).skip(skip)

      res.json({
          message: "Order(s) get successfully",
          data: find
      })
  }catch(error){
      throw new Error(error)
  }
})

const addOrder = asyncHandler(async (req, res) => {
  const { addressId, items, deliveryDate, firstOrder, offerCode } = req.body;

  // Check if products exist
  let productIds = items.map(item => item.productId);
  let products = await Product.find({ _id: { $in: productIds } });

  if (products.length !== productIds.length) {
    return res.status(400).json({ error: 'Products do not exist' });
  }

  // Calculate order total and create order object
  let total = 0;
  let discount = '';
  let orderItems = items.map(item => {
    let product = products.find(p => p._id.toString() === item.productId)
    let price = product.offerPrice
    let quantity = item.quantity
    let color = item.color
    let size = item.size
    let subTotal = price * quantity
    total += subTotal
    return { product: product._id, quantity, color, size, price, subTotal };
  });

  if (firstOrder && offerCode != '') {
    let prevOrder = await Order.find({user: { $in: req.user.id }})
    if (prevOrder?.length === 0) {
      let bonus = await Coupon.findOne({status: 'Y', type: 'B'});
      if (bonus?.worthType === 'Rs') {
        total -= bonus?.worth;
      } else {
        var percent = (bonus?.worth / 100) * total;
        total -= percent
      }
      discount = 'First Order';
    }else{
      return res.status(400).json({ error: 'This not user first order' });
    }
  }

  if (offerCode) {
    let offer;
    if (offerCode.startsWith("WLREFFER")) {
      offer = await validateReffer(offerCode, total, req.user.id)
      if (offer?.error) {
        return res.status(400).json(offer);
      }else{
        if (offer?.data?.worthType === 'Rs') {
          total -= offer?.data?.worth;
        } else {
          var percent = (offer?.data?.worth / 100) * total;
          total -= percent
        }
        discount = offerCode;
        try {
          await Coupon.findOneAndUpdate({type: 'RB'}, {$push:{"validUsers": offer.user}});
        } catch (err) {
          return res.status(500).json({ error: err });
        }
      }
    }else{
      offer = await validateCoupon(offerCode, total, req.user.id)
      if (offer?.error) {
        return res.status(400).json(offer);
      }else{
        if (offer?.data?.worthType === 'Rs') {
          total -= offer?.data?.worth;
        } else {
          var percent = (offer?.data?.worth / 100) * total;
          total -= percent
        }
        discount = offer.data?.code;
        try {
          await Coupon.findOneAndUpdate({type: 'RB'}, {$pull:{"validUsers": offer.user}});
        } catch (err) {
          return res.status(500).json({ error: err });
        }
      }
    }
  }

  const order = new Order({
    user: new ObjectId(req.user.id),
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

const getOrderDetails = asyncHandler(async (req, res) => {
  let { orderId } = req.params

  try {
    let orderDetails = await Order.findById(orderId);
    if (orderDetails !== null) {
      let data = {...orderDetails._doc}
      let partner = await DeliveryPartner.findById(orderDetails.deliveryPartner);
      let address = await Address.findById(orderDetails.address);

      data['deliveryPartner'] = partner
      data['address'] = address;

      res.json({
        message: "Get order details successfully",
        data: data
      }) 
    }else{
      return res.status(400).json({ error: 'Invalid Order Id' });
    }
  } catch (err) {
    throw new Error(err)
  }
})

const cancelOrder = asyncHandler(async (req, res) => {
  let { orderId } = req.params
  let reason = req.body;

  try {
    await Order.findByIdAndUpdate(orderId, {status: 'C', cancel: reason}, {new: true});
    res.json({message: "Order was canceled"})
  } catch (err) {
    throw new Error(err)
  }
})

const changeDate = asyncHandler(async (req, res) => {
  let { orderId } = req.params
  let { date } = req.body;

  try {
    await Order.findByIdAndUpdate(orderId, {deliveryAt: date, changeDate: 'Y'}, {new: true});
    res.json({message: "Delivery date was changed"})
  } catch (err) {
    throw new Error(err)
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

module.exports = { getOrders, addOrder, getOrderDetails, cancelOrder, changeDate, reviewDP }

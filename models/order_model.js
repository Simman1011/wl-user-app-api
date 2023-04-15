const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  subTotal: {
    type: Number,
    required: true,
    min: 0
  }
});

const orderReviewSchema = new mongoose.Schema({
  report:{
    type: String
  },
  star: {
    type: Number
  },
  message: {
    type: String
  },
  image: {
    type: String
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    required: true
  },
  address: {
    type: ObjectId,
    required: true
  },
  items: {
    type: [orderItemSchema],
    required: true
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  status:{
    type: String,
    required: true,
    default: 'I'
  },
  deliveryPartner:{
    type: ObjectId
  },
  dpReview:{
    type: orderReviewSchema
  },
  offerOrCoupon:{
    type: String
  },
  distance:{
    type: String
  },
  deliveryAt:{
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('order', orderSchema);


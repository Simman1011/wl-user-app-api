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
  offerOrCoupon:{
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


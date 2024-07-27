const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const ItemSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  subTotal: {
    type: Number,
    required: true,
    min: 0,
  },
});

const reviewSchema = new mongoose.Schema({
  report: {
    type: String,
  },
  star: {
    type: Number,
  },
  message: {
    type: String,
  },
  image: {
    type: String,
  },
});

const cancelSchema = new mongoose.Schema({
  reason: {
    type: Number,
  },
  comment: {
    type: String,
  },
});

const orderSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    required: true,
  },
  address: {
    type: ObjectId,
    required: true,
  },
  items: {
    type: [ItemSchema],
    required: true,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    required: true,
    default: "W",
  },
  deliveryPartner: {
    type: ObjectId,
  },
  dpReview: {
    type: reviewSchema,
  },
  offerOrCoupon: {
    type: String,
  },
  distance: {
    type: String,
  },
  cancel: {
    type: cancelSchema,
  },
  deliveryAt: {
    type: Date,
    required: true,
  },
  changeDate: {
    type: String,
    default: "N",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("order", orderSchema);

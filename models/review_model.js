const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

var ReviewSchema = new mongoose.Schema({
  order: {
    type: ObjectId,
    required: true,
  },
  user: {
    type: ObjectId,
    required: true,
  },
  product: {
    type: ObjectId,
    required: true,
  },
  star: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
  },
  images: {
    type: Array,
  },
  status: {
    type: String,
    default: "Y",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("review", ReviewSchema);

const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const cartSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    required: true
  },
  items: [{
    product: {
      type: ObjectId,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
});

module.exports = mongoose.model('cart', cartSchema);

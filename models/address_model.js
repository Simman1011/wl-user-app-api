const mongoose = require("mongoose");

var addressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  houseNo: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
  },
  type: {
    type: String,
  },
  mobile: {
    type: String,
    required: true,
  },
  altMobile: {
    type: String,
  },
  mapLocation: {
    type: Object,
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

module.exports = mongoose.model("Address", addressSchema);

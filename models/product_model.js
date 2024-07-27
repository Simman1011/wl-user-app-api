const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const stockBySizeSchema = new mongoose.Schema({
  size: {
    type: String,
  },
  stocks: {
    type: Number,
  },
});

const stockOptionSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  options: {
    type: [stockBySizeSchema],
    required: true,
  },
});

var productSchema = new mongoose.Schema({
  mainCat: {
    type: ObjectId,
    required: true,
  },
  subCat: {
    type: ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  slideImages: {
    type: Array,
  },
  offerPrice: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  offerPct: {
    type: Number,
    required: true,
  },
  stockOptions: {
    type: [stockOptionSchema],
    required: true,
  },
  totalStocks: {
    type: Number,
    default: 0,
    required: true,
  },
  tagId: {
    type: Number,
  },
  fits: {
    type: String,
  },
  sleeve: {
    type: String,
  },
  fabric: {
    type: String,
  },
  pattern: {
    type: String,
  },
  packOf: {
    type: String,
  },
  description: {
    type: String,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "N",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("product", productSchema);

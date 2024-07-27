const mongoose = require("mongoose");

var subCatSchema = new mongoose.Schema({
  mainCatId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
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

module.exports = mongoose.model("sub_cats", subCatSchema);

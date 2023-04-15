const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const DocSchema = new mongoose.Schema({
    aadhar:{
      type: String,
      required:true
    },
    pan: {
      type: String,
      required:true
    },
    passbook: {
      type: String,
      required:true
    },
    licence:{
      type: String,
      required:true
    },
    rcBook: {
      type: String,
      required:true
    },
    insurance: {
      type: String,
      required:true
    }
});

var DeliveryPartnerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    profile:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    docs:{
        type:DocSchema
    },
    zone:{
        type:ObjectId
    },
    status:{
        type:String,
        default: "Y"
    },
    createdAt:{ 
        type:Date,
        default: Date.now 
    },
    updateAt:{ 
        type:Date
    }
});

module.exports = mongoose.model('delivery_partner', DeliveryPartnerSchema);
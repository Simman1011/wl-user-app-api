const mongoose = require('mongoose');

var couponSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    code:{
        type:String,
    },
    worth:{
        type:Number,
        required:true,
    },
    totalOrders:{
        type:Number,
        default: 0
    },
    minPrice:{
        type:Number
    },
    useLimit:{
        type:Number
    },
    expiryDate:{
        type : Date
    },
    status:{
        type:String,
        default: "Y"
    },
    createdAt:{ 
        type : Date,
        default: Date.now 
    },
    updateAt:{ 
        type : Date
    }
});

module.exports = mongoose.model('coupon', couponSchema);
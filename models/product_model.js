const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    mainCatId:{
        type:String,
        required:true,
    },
    subCatId:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    mainImage:{
        type:String,
        required:true,
    },
    slideImages:{
        type:Array
    },
    offerPrice:{
        type:Number,
        required:true,
    },
    sellingPrice:{
        type:Number,
        required:true,
    },
    offerPct:{
        type:Number,
        required:true,
    },
    sizes:{
        type:Array
    },
    colors:{
        type:Array
    },
    tagId:{
        type:Number
    },
    stocks:{
        type:Number
    },
    sleeve:{
        type:String
    },
    fabric:{
        type:String
    },
    pattern:{
        type:String
    },
    packOf:{
        type:String
    },
    description:{
        type:String
    },
    isPopular:{
        type:Boolean,
        default: false
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
        type : Date,
    }
});

module.exports = mongoose.model('product', productSchema);
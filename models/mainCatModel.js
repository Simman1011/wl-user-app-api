const mongoose = require('mongoose');

var mainCatSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
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

module.exports = mongoose.model('main_cats', mainCatSchema);
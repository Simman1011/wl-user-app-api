const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    profileImg:{
        type:String,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
    },
    dob:{
        type:Date,
    },
    language:{
        type:String,
    },
    totalOrders:{
        type:Number,
        default: 0
    },
    refferalCode:{
        type:String,
    },
    wishlist:{
        type:Array,
        default: []
    },
    cart:{
        type:Array,
        default: []
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

userSchema.pre("save", async function (next){
    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.isPasswordMatched = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
    },
    dob:{
        type:String,
    },
    language:{
        type:String,
    },
    address:{
        type:Array,
    },
    totalOrders:{
        type:Number,
        default: 0
    },
    refferalCode:{
        type:String,
    },
    status:{
        type:String,
        default: "Y"
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
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    profileImg:{
        type:String,
        default: "https://img.myloview.com/posters/default-avatar-profile-icon-vector-social-media-user-image-700-205124837.jpg"
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
    status:{
        type:String,
        default: "Y"
    },
});

userSchema.pre("save", async function (next){
    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.isPasswordMatched = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema);
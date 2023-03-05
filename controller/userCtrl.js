const User = require("../models/userModel")
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { getRefferalCode } = require("../helper/index")

// New user register
const userRegister = asyncHandler(async (req, res) =>{
    const email = req.body.email;
    const mobile = req.body.mobile;
    let find = { status: 'Y', $or: [{ email:email }, {mobile:mobile}] }
    const findUser = await User.findOne(find)
    let errorMeg = ''
    console.log(findUser);
    if (findUser) {
        if (findUser.mobile === mobile) errorMeg += 'Mobile Number'
        if (findUser.mobile === mobile && findUser.email === email) errorMeg += ' and '
        if (findUser.email === email) errorMeg += 'Email'
        
        throw new Error(`${errorMeg} Already Exists`)
    }else{
        //Create a new User
        let newUser = req.body;
        newUser['refferalCode'] = getRefferalCode()
        await User.create(newUser)
        res.json({message: "Register successfully"})
    }
})

// User login
const userLogin = asyncHandler(async (req, res)=>{
    const { user, password } = req.body
    let find = { $or: [ { email:user }, {mobile:user}] }
    const UserDetails = await User.findOne(find)
    if(UserDetails){
        if(await UserDetails.isPasswordMatched(password)){
            res.json({
                UserDetails,
                token: generateToken(UserDetails?._id)
            })
        }else{
            throw new Error("Password wrong")
        }
    }else{
        throw new Error("User not found")
    }
})

// User delete account
const deleteAccount = asyncHandler(async (req, res)=>{
    const { id } = req.params
    try{
        await User.findByIdAndUpdate(id,{status: "D"},{new: true})
        res.json({message: "Your account has been deleted"})
    }catch(error){
        throw new Error(error)
    }
})

// User profile update
const profileUpdate = asyncHandler(async (req, res)=>{
    const { id } = req.params
    try{
        await User.findByIdAndUpdate(id,req.body,{new: true})
        res.json({message: "Profile has been updated"})
    }catch(error){
        throw new Error(error)
    }
})

module.exports = { userRegister, userLogin, deleteAccount, profileUpdate }
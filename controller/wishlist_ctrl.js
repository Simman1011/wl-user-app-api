const {ObjectId} = require('mongodb');
const User = require("../models/user_model")
const asyncHandler = require("express-async-handler");

const getUserWishlist = asyncHandler(async (req, res) =>{
    let { limit, skip } = req.query;

    try{
        let find = await User.find({isPopular: true}).limit(limit).skip(skip)
        
        res.json({
            message: "Get Popular products successfully",
            data: find
        })
    }catch(error){
        throw new Error(error)
    }
})

const toggleWishlist = asyncHandler(async (req, res) =>{
    let { userId } = req.params
    let { productId } = req.body;

    try{
        let user = await User.findById(userId)
        let userWishlist = user.wishlist
            
        console.log(userWishlist.find({$in: productId}));

        // await User.updateOne(
        //     { _id: userId },
        //     { $push: { wishlist: productId } }
        // )
        
        res.json({message: "Product added to wishlist successfully", data: userWishlist})
    }catch(error){
        throw new Error(error)
    }
})

module.exports = { getUserWishlist, toggleWishlist }
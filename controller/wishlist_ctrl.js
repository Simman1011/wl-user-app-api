const {ObjectId} = require('mongodb');
const User = require("../models/user_model")
const Product = require("../models/product_model")
const asyncHandler = require("express-async-handler");

const getUserWishlist = asyncHandler(async (req, res) =>{
    let { limit, skip } = req.query;

    try{
        let user = await User.findById(req.user.id);
        let userWishlist = user.wishlist;
        let products = await Product.find({ '_id': { $in: userWishlist } }).limit(limit).skip(skip);

        res.json({
            message: "Get Popular products successfully",
            data: products
        })
    }catch(error){
        throw new Error(error)
    }
})

const toggleWishlist = asyncHandler(async (req, res) =>{
    let { productId } = req.body;

    try{
        let user = await User.findById(req.user.id).find({wishlist: {$in: [productId]}})

        if (user?.length > 0) {
            await User.updateOne(
                { _id: req.user.id },
                { $pull: { wishlist: productId }}
            )
            res.json({message: "Product removed to wishlist successfully"})
        }else{
            await User.updateOne(
                { _id: req.user.id },
                { $push: { wishlist: productId }}
            )
            res.json({message: "Product added to wishlist successfully"})
        }
    }catch(error){
        throw new Error(error)
    }
})

module.exports = { getUserWishlist, toggleWishlist }
const Coupon = require("../models/coupon_model")
const asyncHandler = require("express-async-handler");

const getCoupon = asyncHandler(async (req, res) =>{
    let { type } = req.params
    let { limit, skip } = req.query;
    try{
        let find = await Coupon.find({type: {$in: type}}).limit(limit).skip(skip)

        res.json({
            message: "Coupon(s) get successfully",
            data: find
        })
    }catch(error){
        throw new Error(error)
    }
})

module.exports = { getCoupon }
const Coupon = require("../models/coupon_model")
const Order = require('../models/order_model');

function getRefferalCode(){
    return('WLREFFER' + Math.random().toString(36).slice(-6).toUpperCase())
}

async function validateCoupon(code, price) {
    let couponDetails = await Coupon.findOne({status: 'Y', code: code});
    if (couponDetails !== null) {
        let totalOrders = await Order.find({offerOrCoupon: {$in : code}});
        if (totalOrders?.length <= couponDetails?.useLimit) {
            if (price > couponDetails?.minPrice) {
                return({
                    message: "Coupon apply successfully",
                    data: couponDetails
                })
            }
            return({
                error: `This coupon validate minimum Rs.${couponDetails?.minPrice} shopping`
            })
        }else{
            return({
                error: 'This coupon code out of the use limit'
            })
        }   
    }else{
        return({
            error: 'This coupon code is not valid'
        })
    }
}

module.exports = { getRefferalCode, validateCoupon }
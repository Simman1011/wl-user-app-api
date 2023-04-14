const express = require("express")
const router = express.Router()
const { getCoupon, applyCoupon } = require("../../controller/coupon_ctrl")

router.get("/:type", getCoupon)
router.get("/apply/:code", applyCoupon)

module.exports = router
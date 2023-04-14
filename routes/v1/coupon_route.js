const express = require("express")
const router = express.Router()
const { getCoupon, getMyCoupons, applyCoupon } = require("../../controller/coupon_ctrl")
const auth = require("../../middlewares/auth");

router.get("/:type", auth, getCoupon)
router.get("/my/:user", auth, getMyCoupons)
router.get("/apply/:code", auth, applyCoupon)

module.exports = router
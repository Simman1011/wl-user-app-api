const express = require("express")
const router = express.Router()
const { getCoupon } = require("../../controller/coupon_ctrl")

router.get("/:type", getCoupon)

module.exports = router
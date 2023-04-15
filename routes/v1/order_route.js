const express = require("express")
const router = express.Router()
const auth = require("../../middlewares/auth");
const { getOrders, addOrder, reviewDP } = require("../../controller/order_ctrl")

router.get("/get/:user", auth, getOrders)
router.post("/add", auth, addOrder)
router.post("/review-dp/:orderId", auth, reviewDP)

module.exports = router
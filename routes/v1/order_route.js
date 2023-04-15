const express = require("express")
const router = express.Router()
const auth = require("../../middlewares/auth");
const { getOrders, addOrder, getOrderDetails, reviewDP } = require("../../controller/order_ctrl")

router.get("/getAll/:user", auth, getOrders)
router.post("/add", auth, addOrder)
router.get("/getOne/:orderId", auth, getOrderDetails)
router.post("/review-dp/:orderId", auth, reviewDP)

module.exports = router
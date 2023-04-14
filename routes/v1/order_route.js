const express = require("express")
const router = express.Router()
const auth = require("../../middlewares/auth");
const { getOrders, addOrder } = require("../../controller/order_ctrl")

router.get("/get/:user", auth, getOrders)
router.post("/add", auth, addOrder)

module.exports = router
const express = require("express")
const router = express.Router()
const auth = require("../../middlewares/auth");
const { addOrder } = require("../../controller/order_ctrl")

router.post("/add", auth, addOrder)

module.exports = router
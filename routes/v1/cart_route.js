const express = require("express")
const router = express.Router()
const auth = require("../../middlewares/auth");
const { addProduct } = require("../../controller/cart_ctrl")

router.post("/add", auth, addProduct)

module.exports = router
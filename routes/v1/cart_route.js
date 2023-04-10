const express = require("express")
const router = express.Router()
const auth = require("../../middlewares/auth");
const { addProduct, removeProduct } = require("../../controller/cart_ctrl")

router.post("/add", auth, addProduct)
router.post("/remove", auth, removeProduct)

module.exports = router
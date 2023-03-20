const express = require("express")
const router = express.Router()
const { getProductByMainCat, getProductBySubCat, addProduct } = require("../../controller/product_ctrl")

router.get("/mainCat/:id", getProductByMainCat)
router.get("/subCat/:id", getProductBySubCat)
router.post("/add", addProduct)

module.exports = router
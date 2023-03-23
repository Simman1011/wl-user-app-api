const express = require("express")
const router = express.Router()
const { getProductsByMainCat, getProductsBySubCat, getProductDetails, getPopularProducts, addProduct } = require("../../controller/product_ctrl")

router.get("/mainCat/:id", getProductsByMainCat)
router.get("/subCat/:id", getProductsBySubCat)
router.get("/details/:id", getProductDetails)
router.get("/popular", getPopularProducts)
router.post("/add", addProduct)

module.exports = router
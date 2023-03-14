const express = require("express")
const router = express.Router()
const { getProductBySubCat } = require("../../controller/product_ctrl")

router.get("/subCat/:id", getProductBySubCat)

module.exports = router
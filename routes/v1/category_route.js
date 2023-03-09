const express = require("express")
const router = express.Router()
const { getMainCat } = require("../../controller/mainCat_ctrl")
const { getSubCat } = require("../../controller/subCat_ctrl")

router.get("/main", getMainCat)
router.get("/sub", getSubCat)

module.exports = router
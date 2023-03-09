const express = require("express")
const router = express.Router()
const { getMainCat } = require("../../controller/mainCat_ctrl")

router.get("/main", getMainCat)

module.exports = router
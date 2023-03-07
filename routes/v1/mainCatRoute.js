const express = require("express")
const router = express.Router()
const { getMainCat } = require("../../controller/mainCatCtrl")

router.get("/", getMainCat)

module.exports = router
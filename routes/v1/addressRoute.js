const express = require("express")
const router = express.Router()
const { addAddress, getUserAds, getOneAds, updateAds, deleteAds } = require("../../controller/addressCtrl")

router.post("/add/:userId", addAddress)
router.get("/getAll/:userId", getUserAds)
router.get("/getOne/:id", getOneAds)
router.put("/update/:id", updateAds)
router.put("/delete/:id", deleteAds)

module.exports = router
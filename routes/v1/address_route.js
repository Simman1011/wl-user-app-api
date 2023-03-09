const express = require("express")
const router = express.Router()
const auth = require("../../middlewares/auth");
const { addAddress, getUserAds, getOneAds, updateAds, deleteAds } = require("../../controller/address_ctrl")

router.post("/add/:userId", auth, addAddress)
router.get("/getAll/:userId", auth, getUserAds)
router.get("/getOne/:id", auth, getOneAds)
router.put("/update/:id", auth, updateAds)
router.put("/delete/:id", auth, deleteAds)

module.exports = router
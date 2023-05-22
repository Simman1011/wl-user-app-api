const express = require("express")
const router = express.Router()
const auth = require("../../middlewares/auth");
const { getUserWishlist, toggleWishlist } = require("../../controller/wishlist_ctrl")

router.post("/toggle", auth, toggleWishlist)
router.get("/getAll", auth, getUserWishlist)

module.exports = router
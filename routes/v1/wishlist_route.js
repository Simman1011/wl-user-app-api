const express = require("express")
const router = express.Router()
const auth = require("../../middlewares/auth");
const { getUserWishlist, toggleWishlist } = require("../../controller/wishlist_ctrl")

router.post("/toggle/:userId", auth, toggleWishlist)
router.get("/getAll/:userId", auth, getUserWishlist)

module.exports = router
const express = require("express")
const router = express.Router()
const auth = require("../../middlewares/auth");
const { getReview, addEditReview, deleteReview } = require("../../controller/review_ctrl")

router.get("/", getReview)
router.post("/:id", auth, addEditReview)
router.post("/delete/:id", auth, deleteReview)

module.exports = router
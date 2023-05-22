const express = require("express")
const router = express.Router()
const auth = require("../../middlewares/auth");
const { register,login,logout, deleteAccount, profileUpdate} = require("../../controller/user_ctrl")

router.post("/register", register)
router.post("/login", login)
router.get("/logout", auth, logout)
router.put("/delete", auth, deleteAccount)
router.put("/update", auth, profileUpdate)

module.exports = router
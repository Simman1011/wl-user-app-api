const express = require("express")
const router = express.Router()
const { register,login,logout, deleteAccount, profileUpdate} = require("../../controller/user_ctrl")

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)
router.put("/delete/:id", deleteAccount)
router.put("/update/:id", profileUpdate)

module.exports = router
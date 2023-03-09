const express = require("express")
const router = express.Router()
const { userRegister, userLogin, deleteAccount, profileUpdate} = require("../../controller/user_ctrl")

router.post("/register", userRegister)
router.post("/login", userLogin)
router.put("/delete/:id", deleteAccount)
router.put("/update/:id", profileUpdate)

module.exports = router
const express = require("express")
const router = express.Router()
const { userRegister, userLogin, deleteAccount } = require("../controller/userCtrl")

router.post("/register", userRegister)
router.post("/login", userLogin)
router.put("/:id", deleteAccount)

module.exports = router
const express=require("express")
const { signup, login, logout, getUsers, getUser } = require("../controllers/user")
const router=express.Router()

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/users").get(getUsers)
router.route("/user").post(getUser)

module.exports=router
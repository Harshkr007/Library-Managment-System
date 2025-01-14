const express=require("express")
const getBooks = require("../controllers/book")
const router=express.Router()

router.route("/").get(getBooks)

module.exports=router
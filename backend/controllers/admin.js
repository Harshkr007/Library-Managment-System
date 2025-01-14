const Admin = require("../models/admin")
const jwt=require("jsonwebtoken")
const authenticateToken=require("../middlewares/user")

const signup=async(req, res)=>{
    try {
        const {username, email, password}=req.body
        console.log(username, email, password)
        const emailExists=await Admin.findOne({email:email})
        console.log(emailExists)
        if(emailExists){
            res.status(409).json({"message":"email already exists"})
            return
        }
        const newAdmin=new Admin({username, email, password})
        const response=await newAdmin.save()
        const authToken=jwt.sign({email:response.email, username: response.username, _id: response._id, type: "admin"}, "mox")

        return res.json({"message": "signup successful", "token": authToken});
    } catch (error) {
        console.log("error while admin signup:", error)
        res.json({"message":"error while signup"})
    }
}

const login=async(req, res)=>{
    try {
        const {email, password}=req.body
        const emailExists=await Admin.findOne({email:email})
        if(!emailExists){
            res.json({"message":"incorrect email or password"})
            return
        }
        if(emailExists.password!==password){
            res.json({"message":"incorrect email or password"})
            return
        }

        const response=emailExists
        const authToken=jwt.sign({email:response.email, username: response.username, _id: response._id, type: "admin"}, "mox")
        return res.json({"message": "login successful", "token": authToken});
    } catch (error) {
        console.log("error while admin login:", error)
        res.json({"message":"error while login"})
    }
}

const logout=async(req, res)=>{
    try {
        
    } catch (error) {
        console.log("error while admin logout:", error)
    }
}

module.exports={signup, login, logout}
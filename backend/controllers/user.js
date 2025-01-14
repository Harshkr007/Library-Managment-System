const User = require("../models/user")
const jwt=require("jsonwebtoken")
const authenticateToken=require("../middlewares/user")

const signup=async(req, res)=>{
    try {
        const {username, email, password}=req.body
        console.log(username, email, password)
        const emailExists=await User.findOne({email:email})
        console.log(emailExists)
        if(emailExists){
            res.status(409).json({"message":"email already exists"})
            return
        }
        const newUser=new User({username, email, password})
        const response=await newUser.save()

        const authToken=jwt.sign({email:response.email, username: response.username, _id: response._id, type: "user"}, "mox")
        
        return res.json({"message": "signup successful", "token": authToken});
    } catch (error) {
        console.log("error while user signup:", error)
        res.json({"message":"error while signup"})
    }
}

const login=async(req, res)=>{
    try {
        const {email, password}=req.body
        const emailExists=await User.findOne({email:email})
        if(!emailExists){
            res.json({"message":"incorrect email or password"})
            return
        }
        if(emailExists.password!==password){
            res.json({"message":"incorrect email or password"})
            return
        }

        const response=emailExists
        const authToken=jwt.sign({email:response.email, username: response.username, _id: response._id, type: "user"}, "mox")
        return res.json({"message": "login successful", "token": authToken});
    } catch (error) {
        console.log("error while user login:", error)
        res.json({"message":"error while login"})
    }
}

const getUsers=async(req, res)=>{
    try {
        const users=await User.find({})
        res.json(users)
    } catch (error) {
        console.log("error while fetching users")
        res.json({"message":"error while fetching users"})
    }
}

const getUser=async(req, res)=>{
    try {
        console.log(req.body)
        const email=req.body.email
        const user=await User.findOne({email:email})
        console.log(user)
        res.json(user)
    } catch (error) {
        console.log("error while fetching user")
        res.json({"message":"error while fetching user"})
    }
}

const logout=async(req, res)=>{
    try {
        
    } catch (error) {
        console.log("error while user logout:", error)
    }
}

module.exports={signup, login, logout, getUsers, getUser}
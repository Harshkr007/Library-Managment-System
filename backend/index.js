const express=require("express")
const app=express()
const cors=require("cors")
require("dotenv").config()
const mongoose=require("mongoose")

const adminRoutes=require("./routers/admin.js")
const userRoutes=require("./routers/user.js")
const bookRoutes=require("./routers/book.js")

mongoose.connect("mongodb+srv://harshkr1890:123@cluster7.mrbhi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster7").then(()=>{
    console.log("db conncted")
}).catch(()=>{
    console.log("error while connecting to db")
})

app.use(express.json())
app.use(cors())

app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/books", bookRoutes)

app.get("/", (req, res)=>{
    res.json({"message":"alive"})
})

const PORT=process.env.PORT || 8005

app.listen(PORT, ()=>{
    console.log(`server is listening on PORT ${PORT}`)
})
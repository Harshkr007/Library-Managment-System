const mongoose=require("mongoose")

const BookSchema=mongoose.Schema({
    title:{
        type: String,
        requred: true
    },
    author:{
        type: String,
        required: true
    },
    serialNo:{
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

const Book=mongoose.model("Book", BookSchema)

module.exports=Book
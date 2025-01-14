const Book = require("../models/book")

const getBooks=async(req, res)=>{
    try {
        const books=await Book.find({})
        res.json(books)
    } catch (error) {
        console.log("error while fetching books:", error)
        res.json({"message":"couldn't fetch books"})
    }
}

module.exports=getBooks
import Book from "../models/book.model.js";
import Membership from "../models/membership.model.js";
import Transaction from "../models/transation.model.js";
import User from "../models/user.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js ";

const handleAddBook = AsyncHandler(async (req , res) => {
    const {title,author,genre,serialNo} = req.body;

    if(!title || !author || !serialNo || !genre){
        throw new ApiError(400, "Please provide all the required fields");
    }

    const bookExist = await Book.findOne({serialNo});

    if(bookExist){
        throw new ApiError(400, "Book already exist");
    }

    const book = await Book.create({
        title,
        author,
        genre,
        serialNo
    })

    if(!book){
        throw new ApiError(400, "Book not added");
    }

    const response = new ApiResponse(200, "Book added successfully", book);

    res.status(200).json(response);
})

const handleGetBookInfo = AsyncHandler(async (req, res) => {
    const { search } = req.query;

    if(!search) {
        throw new ApiError(400, "Please provide search query");
    }

    const books = await Book.find({
        $or: [
            { title: { $regex: search, $options: 'i' } },
            { author: { $regex: search, $options: 'i' } },
            { genre: { $regex: search, $options: 'i' } },
            { serialNo: { $regex: search, $options: 'i' } }
        ]
    });

    const response = new ApiResponse(200, "Books found", books);
    res.status(200).json(response);
});

const handleGetAllBooks = AsyncHandler(async (req , res) => {

    const books = await Book.find();

    if(!books){
        throw new ApiError(400, "No books found");
    }

    const response = new ApiResponse(200, "Books found", books);

    res.status(200).json(response);
})

const handleUpdateBook = AsyncHandler(async (req, res) => {
    const {serialNo} = req.params;
    const {title,author,genre} = req.body;

    if(!serialNo){
        throw new ApiError(400, "Please provide SerialNo");
    }

    if(!title || !author || !genre){
        throw new ApiError(400, "Please provide the feild to update");
    }

    const book = await Book.findOne({serialNo});

    if(!book){
        throw new ApiError(400, "Book not found");
    }

    const updatedBook = await Book.findOneAndUpdate(
        {serialNo},
        {title,author,genre},
        {new: true}
    )

    const response = new ApiResponse(200, "Book updated successfully", updatedBook);

    res.status(200).json(response);
})

const handleDeleteBook = AsyncHandler(async (req, res) => {
    const {SerialNo} = req.params;

    if(!SerialNo){
        throw new ApiError(400, "Please provide SerialNo");
    }

    const deletedBook = await Book.findOneAndDelete({SerialNo});

    if(!deletedBook){
        throw new ApiError(400, "Book not found");
    }

    const response = new ApiResponse(200, "Book deleted successfully", deletedBook);


    res.status(200).json(response);
})

const handleIssueBook = AsyncHandler(async (req, res) => {
    const { serialNo } = req.params;
    const { userId } = req.body;
    
    if(!userId || !serialNo){
        throw new ApiError(400, "Please provide userId and serialNo");
    }

    const book = await Book.findOne({ serialNo });

    if(!book){
        throw new ApiError(404, "Book not found");
    }

    if(!book.availability){
        throw new ApiError(400, "Book is already issued");
    }

    book.availability = false;
    book.issueHistory.push({
        userId,
        issueDate: new Date(),
    });

    await book.save();

    const response = new ApiResponse(200, "Book issued successfully", book);
    res.status(200).json(response);
});

const handleReturnBook = AsyncHandler(async (req,res) => {
    const {userId, bookId} = req.body;

    if(!userId || !bookId){
        throw new ApiError(400, "Please provide userId and bookId");
    }

    const book = await Book.findById(bookId);

    if(!book){
        throw new ApiError(400, "Book not found");
    }

    const user = await User.findById(userId);

    if(!user){
        throw new ApiError(400, "User not found");
    }

    const membership = await Membership.findOne({membershipType: user.membershipType})

    if(!membership){
        throw new ApiError(400, "Membership not found");
    }


    const bookIssueTimeLimit  = membership.benefits.BookIssueTime;
    // await Benefit.findById(membership.benefits).BookIssueTime;

    const issueDate = new Date(book.issueHistory[0].issueDate);

    const returnDate = new Date();//current Date

    const diffTime = Math.abs(returnDate - issueDate);

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const totalFine = 0;
    if(diffDays > bookIssueTimeLimit){
       const finePerDay = membership.benefits.FinePerDay;
       totalFine = finePerDay * (diffDays - bookIssueTimeLimit);
    }

    book.issueHistory[0].returnDate = returnDate;

    book.availability = true;

    const updatedBook = await Book.save();

    const newTransaction = await Transaction.create({
        userId,
        bookId,
        issueDate,
        returnDate,
        status: "Returned",
        fine:{
            fineAmount: totalFine,  
            paidStatus: true
        }
    })

    if(!newTransaction){
        throw new ApiError(400, "Transaction not created");
    }

    const Response = new ApiResponse(200,"Book returned successfully", {
        book: updatedBook,
        transaction: newTransaction
    });

    res.status(200).json(Response);

})

const handleGetTotalFine = AsyncHandler(async (req,res) => {
    const {userId, bookId} = req.body;

    if(!userId || !bookId){
        throw new ApiError(400, "Please provide userId and bookId");
    }

    const book = await Book.findById(bookId);

    if(!book){
        throw new ApiError(400, "Book not found");
    }

    const user = await User.findById(userId);

    if(!user){
        throw new ApiError(400, "User not found");
    }

    const membership = await Membership.findOne({membershipType: user.membershipType})

    if(!membership){
        throw new ApiError(400, "Membership not found");
    }

    const bookIssueTimeLimit  = membership.benefits.BookIssueTime;

    const issueDate = new Date(book.issueHistory[0].issueDate);

    const returnDate = new Date();//current Date

    const diffTime = Math.abs(returnDate - issueDate);

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const totalFine = 0;

    if(diffDays > bookIssueTimeLimit){
       const finePerDay = membership.benefits.FinePerDay;
       totalFine = finePerDay * (diffDays - bookIssueTimeLimit);
    }

    const Response = new ApiResponse(200,"Total fine", totalFine);

    res.status(200).json(Response);
})

const handleGetUserBooks = AsyncHandler(async (req, res) => {
    const userId = req.user._id;

    const userBooks = await Book.aggregate([
        {
            $match: {
                "issueHistory": {
                    $elemMatch: {
                        userId: new mongoose.Types.ObjectId(userId),
                        returnDate: null
                    }
                }
            }
        },
        {
            $project: {
                title: 1,
                author: 1,
                genre: 1,
                serialNo: 1,
                imageUrl: 1,
                issueDate: {
                    $filter: {
                        input: "$issueHistory",
                        as: "history",
                        cond: { 
                            $and: [
                                { $eq: ["$$history.userId", new mongoose.Types.ObjectId(userId)] },
                                { $eq: ["$$history.returnDate", null] }
                            ]
                        }
                    }
                }
            }
        }
    ]);

    const response = new ApiResponse(200, "User books fetched successfully", userBooks);
    res.status(200).json(response);
});

export {
    handleAddBook,
    handleGetAllBooks,
    handleUpdateBook,
    handleDeleteBook,
    handleGetBookInfo,
    handleIssueBook,
    handleReturnBook,
    handleGetTotalFine,
    handleGetUserBooks
}
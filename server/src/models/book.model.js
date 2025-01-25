import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true },
  genre: { type: String },
  serialNo: { 
    type: String, 
    unique: true, 
    required: [true, 'Serial number is required'],
    trim: true
  },
  imageUrl: { 
    type: String,
    default: "https://img.freepik.com/premium-vector/orange-red-book-with-blue-ribbon-it_854353-860.jpg?semt=ais_hybrid"
  },
  availability: { 
    type: Boolean, 
    default: true 
  },
  issueHistory: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      issueDate: { type: Date , default: Date.now },
      returnDate: { type: Date, default: null },
    }
  ],
},{
    timestamps: true,
});

const Book = mongoose.model('Book', BookSchema);
export default Book;


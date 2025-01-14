import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true },
  genre: { type: String },
  ISBN: { type: String, unique: true, required: true },
  availability: { type: Boolean, default: true },
  issueHistory: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      issueDate: { type: Date },
      returnDate: { type: Date },
    }
  ],
},{
    timestamps: true,
});

const Book = mongoose.model('Book', BookSchema);
export default Book;


import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    issueDate: { type: Date, required: true, default: Date.now },
    returnDate: { type: Date },
    status: { type: String, enum: ['issued', 'returned'], default: 'issued' },
    fine: { type: Number, default: 0 },
  },{
    timestamps: true,
  });
  
  const Transaction = mongoose.model('Transaction', TransactionSchema);
  export default Transaction;


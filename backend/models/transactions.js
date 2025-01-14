const mongoose=require("mongoose")

const transactionSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    borrowDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: Date,
    status: { 
      type: String, 
      enum: ['borrowed', 'returned', 'overdue'], 
      default: 'borrowed' 
    },
});

const Transaction=mongoose.model('Transaction', transactionSchema);
  
module.exports=Transaction
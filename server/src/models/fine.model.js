import mongoose from "mongoose";

const FineSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
  fineAmount: { type: Number, required: true },
  paidStatus: { type: Boolean, default: false },
},{
    timestamps: true,
});

const Fine = mongoose.model('Fine', FineSchema);
export default Fine;

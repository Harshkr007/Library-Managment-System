const mongoose=require("mongoose")

const fineSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    transaction: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
    amount: { type: Number, required: true },
    paid: { type: Boolean, default: false },
    issuedDate: { type: Date, default: Date.now },
});

const Fine=mongoose.model('Fine', fineSchema);
  
module.exports=Fine
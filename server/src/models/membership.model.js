import mongoose from "mongoose";

const benefitSchema = new mongoose.Schema({
  BookIssueLimit:{
    type: Number,
    required: true,
  },
  BookIssueTime:{
    type: Number,
    required: true,
  },
  FinePerDay:{
    type: Number,
    required: true,
  }
});

const Benefit = mongoose.model('Benefit', benefitSchema);
export {Benefit};

const MembershipSchema = new mongoose.Schema({
  membershipType: { type: String, required: true, unique: true },
  duration: { type: Number, required: true }, // in months
  price: { type: Number, required: true },
  benefits: { type: mongoose.Schema.Types.ObjectId, ref: 'Benefit' },
},{
    timestamps: true,
});

const Membership = mongoose.model('Membership', MembershipSchema);
export default Membership;


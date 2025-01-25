import mongoose from "mongoose";

// const benefitSchema = new mongoose.Schema({
//   BookIssueLimit:{
//     type: Number,
//     required: true,
//   },
//   BookIssueTime:{
//     type: Number,
//     required: true,
//   },
//   FinePerDay:{
//     type: Number,
//     required: true,
//   }
// },{
//   timestamps: true,
// });
// const Benefit = mongoose.model('Benefit', benefitSchema);
// export {Benefit};

const membershipUserSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  joinedDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default:null
  }
},{
  timestamps: true,
})
const MembershipUser = mongoose.model('MembershipUser', membershipUserSchema);
export {MembershipUser};

const MembershipSchema = new mongoose.Schema({
  membershipType: { type: String, required: true, unique: true },
  duration: { type: Number, required: true }, // in months
  price: { type: Number, required: true },
  benefits: {
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
   },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MembershipUser',
  }],
},{
    timestamps: true,
});

const Membership = mongoose.model('Membership', MembershipSchema);
export default Membership;


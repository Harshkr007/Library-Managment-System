const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    joinedDate: { type: Date, default: Date.now },
    lastDate: { 
        type: Date, 
        default: function() {
            const currentDate = new Date();
            return new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
        }
    },
    isActive: { type: Boolean, default: true },
    password: {type: String, required: true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
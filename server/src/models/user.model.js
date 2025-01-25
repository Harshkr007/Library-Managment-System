import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config({ path: './.env' });

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    membershipType: { type: String, default: 'Basic' }, // e.g., Basic, Premium,premium plus
    membershipExpiryDate: { type: Date , default: null }, 
}, {
    timestamps: true,
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        console.log("Password is not modified");
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        console.log("Password is modified");
        next();
    } catch (error) {
        console.log("Error in password hashing :: ", error);
        next(error);
    }
});

userSchema.methods.isPasswordCorrect = async function(password) {
    return bcrypt.compare(password, this.password);
}

userSchema.methods.genrateAccessToken = async function () {
    return await jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }

    )
}

const User = mongoose.model('User', userSchema);
export default User;

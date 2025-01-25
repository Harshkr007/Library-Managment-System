import User from "../models/user.model.js";
import Membership from "../models/membership.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";

const handleUserRegister = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const ExistingUser = await User.findOne({ email });

    if (ExistingUser) {
        throw new ApiError(409, "User already exists with this email");
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if (!user) {
        throw new ApiError(500, "Something went wrong while registering user");
    }

    const response = new ApiResponse(200, "User registered successfully", {
        name: user.name,
        email: user.email,
        membershipType: user.membershipType,
        membershipExpiryDate: user.membershipExpiryDate,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    })

    res.status(200).json(response);
})

const handleUserLogin = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = await user.genrateAccessToken();

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        secure: true,
        sameSite: "strict",
    })

    const response = new ApiResponse(200, "User logged in successfully", {
       user : {
        name: user.name,
        email: user.email,
        role: user.role,
        membershipType: user.membershipType,
        membershipExpiryDate: user.membershipExpiryDate,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
       },
       accessToken
    })

    res.status(200).json(response);
})

const handleAdminLogin = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const admin = await User.findOne({ email });
    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }

    if (admin.role !== "admin") {
        throw new ApiError(401, "You are not authorized to access this route");
    }

    const isPasswordCorrect = await admin.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials");
    }

    const accessToken = await admin.genrateAccessToken();

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 1, // 1 days
        secure: true,
        sameSite: "strict",
    })

    const response = new ApiResponse(200, "Admin logged in successfully", {
        admin: {
            name: admin.name,
            email: admin.email,
            role: admin.role,
            membershipType: admin.membershipType,
            membershipExpiryDate: admin.membershipExpiryDate,
            createdAt: admin.createdAt,
            updatedAt: admin.updatedAt,
        },
        accessToken
    })

    res.status(200).json(response);
})

const handleUserUpdate = AsyncHandler(async (req, res) => {
    const { name, email, oldPassword, newPassword } = req.body;

    if (!name && !email && !oldPassword && !newPassword) {
        throw new ApiError(400, "provide at least one field to update");
    }

    const userInfo = req.user;

    if (!userInfo) {
        throw new ApiError(401, "UserInfo not found");
    }

    const user = await User.findById(userInfo.id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (name) {
        user.name = name;
    }
    if (email) {
        user.email = email;
    }

    if (oldPassword && newPassword) {
        const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

        if (!isPasswordCorrect) {
            throw new ApiError(401, "Invalid credentials");
        }

        user.password = newPassword;
    }

    const updatedUser = await user.save();

    if (!updatedUser) {
        throw new ApiError(500, "Something went wrong while updating user");
    }

    const response = new ApiResponse(200, "User updated successfully", {
        name: updatedUser.name,
        email: updatedUser.email,
        role: user.role,
        membershipType: updatedUser.membershipType,
        membershipExpiryDate: updatedUser.membershipExpiryDate,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
    })

    res.status(200).json(response);
})

const handleUserLogout = AsyncHandler(async (req, res) => {
    res.clearCookie("accessToken");
    res.status(200).json(new ApiResponse(200, "User logged out successfully"));
})

const handleUpdateMembership = AsyncHandler(async (req, res) => {
    const { membershipType } = req.body;

    if (!membershipType) {
        throw new ApiError(400, "Membership type is required");
    }

    const userInfo = req.user;

    if (!userInfo) {
        throw new ApiError(401, "UserInfo not found");
    }

    const user = await User.findById(userInfo.id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const membership = await Membership.findOne({ membershipType });

    if (!membership) {
        throw new ApiError(404, "Membership not found");
    }

    const currentDate = new Date();

    const dayExtend = membership.duration;

    const newExpiryDate = new Date(currentDate.getTime() + dayExtend * 24 * 60 * 60 * 1000);

    user.membershipType = membershipType;
    user.membershipExpiryDate = newExpiryDate;

    const updatedUser = await user.save();

    if (!updatedUser) {
        throw new ApiError(500, "Something went wrong while updating user");
    }

    const response = new ApiResponse(200, "Membership updated successfully", {
        name: updatedUser.name,
        email: updatedUser.email,
        role: user.role,
        membershipType: updatedUser.membershipType,
        membershipExpiryDate: updatedUser.membershipExpiryDate,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
    })

    res.status(200).json(response);
})

const handleGetAllUsers = AsyncHandler(async (req, res) => {
    const users = await User.find({
        role: "user"
    }).select("-password");

    if (!users) {
        throw new ApiError(404, "Users not found");
    }

    const response = new ApiResponse(200, "Users found successfully",users);

    res.status(200).json(response);
 });

const handleGetUser = AsyncHandler(async (req, res) => { 
    const { search } = req.query;

    if (!search) {
        throw new ApiError(400, "Search query is required");
    }

    const users = await User.find({
        $and: [
            { role: "user" },
            {
                $or: [
                    {_id: search },
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } }
                ]
            }
        ]
    }).select("-password");

    if (!users) {
        throw new ApiError(404, "Users not found");
    }

    const response = new ApiResponse(200, "Users found successfully", users);
    res.status(200).json(response);
});

export {
    handleUserRegister,
    handleUserLogin,
    handleAdminLogin,
    handleUserUpdate,
    handleUserLogout,
    handleUpdateMembership,
    handleGetAllUsers,
    handleGetUser
}
import Membership from "../models/membership.model.js";
import { MembershipUser } from "../models/membership.model.js";
import User from "../models/user.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";


//fine calculated over an Item is based on the current membersip in active eventhough when the book was alloted some other membership was active

//for now we haven't implemented any transation system for bying the membership so buying a membership will not store any transation history

const handleGetAllMemberships = AsyncHandler(async (req, res) => {
    const memberships = await Membership.find({});

    if (!memberships) {
        throw new ApiError(400, "No memberships found");
    }

    const response = new ApiResponse(200, "Memberships found", memberships);

    res.status(200).json(response);
});

const handleGetMembership = AsyncHandler(async (req, res) => {
    const { membershipType } = req.params;

    if (!membershipType) {
        throw new ApiError(400, "Please provide membershipId");
    }

    const membership = await Membership.findOne({membershipType});

    if (!membership) {
        throw new ApiError(400, "Membership not found");
    }

    const response = new ApiResponse(200, "Membership found", membership);

    res.status(200).json(response);
});

const handleAddMembership = AsyncHandler(async (req, res) => {
    const { membershipType, duration, price, benefits } = req.body;
   

    if (!membershipType || !duration || !price || !benefits) {
        console.log("Please provide all the required fields , :: ", req.body);
        throw new ApiError(400, "Please provide all the required fields");
    }

    const membershipExist = await Membership.findOne({ membershipType });

    if (membershipExist) {
        throw new ApiError(400, "Membership already exist");
    }

    const membership = await Membership.create({
        membershipType,
        price: price,
        duration: duration,
        benefits: benefits,
    });

    if (!membership) {
        throw new ApiError(400, "Membership not added");
    }

    const response = new ApiResponse(200, "Membership added successfully", membership);

    res.status(200).json(response);
});

const handleUpdateMembership = AsyncHandler(async (req, res) => {
    const { membershipId } = req.params;

    if (!membershipId) {
        throw new ApiError(400, "Please provide membershipId");
    }

    const { membershipType, membershipPrice, membershipDuration, membershipDescription } = req.body;

    if (!membershipType && !membershipPrice && !membershipDuration && !membershipDescription) {
        throw new ApiError(400, "Please provide any feild to update");
    }

    const membership = await Membership.findById(membershipId);

    if (!membership) {
        throw new ApiError(400, "Membership not found");
    }

    if (membershipType) {
        membership.membershipType = membershipType;
    }

    if (membershipPrice) {
        membership.price = membershipPrice;
    }

    if (membershipDuration) {
       membership.duration = membershipDuration;
    }

    if (membershipDescription) {
        membership.benefits.BookIssueLimit = membershipDescription?.BookIssueLimit || membership.benefits.BookIssueLimit;
        membership.benefits.BookIssueTime = membershipDescription?.BookIssueTime || membership.benefits.BookIssueTime;
        membership.benefits.FinePerDay = membershipDescription?.FinePerDay|| membership.benefits.FinePerDay;
    }

    const updatedMembership = await membership.save();

    if (!updatedMembership) {
        throw new ApiError(400, "Membership not updated");
    }

    const response = new ApiResponse(200, "Membership updated successfully", updatedMembership);

    res.status(200).json(response);
});

const handleDeleteMembership = AsyncHandler(async (req, res) => { 

    const { membershipId } = req.params;

    if (!membershipId) {
        throw new ApiError(400, "Please provide membershipId");
    }

    const membership = await Membership.findById(membershipId);

    if (!membership) {
        throw new ApiError(400, "Membership not found");
    }

    const membershipUsers = membership.users;//array of MembershipUser ids

    membershipUsers.forEach(async (membershipUserId) => {
        const membershipUser = await MembershipUser.findById(membershipUserId);

        const user = await User.findById(membershipUser.user);

        user.membershipType = null; //TODO:change to common membership type
        user.membershipExpiryDate = null;
        
        await user.save();

       const deletedMembershipUser = await membershipUser.deleteOne();
    });

    const deletedMembership = await membership.deleteOne();

    if (!deletedMembership) {
        throw new ApiError(400, "Membership not deleted");
    }

    const response = new ApiResponse(200, "Membership deleted successfully", deletedMembership);

    res.status(200).json(response);
});

const handleGetAllMembers = AsyncHandler(async (req, res) => {

    const { membershipId } = req.params;

    if (!membershipId) {
        throw new ApiError(400, "Please provide membershipId");
    }

    const membership = await Membership.findById(membershipId);

    if (!membership) {
        throw new ApiError(400, "Membership not found");
    }

    const membershipUsersIds = membership.users;

    const Users = [];
    membershipUsersIds.map(async (membershipUserId) => {
        const membershipUser = await MembershipUser.findById(membershipUserId).populate("user", "name email");

        Users.push(membershipUser); 
    })

    const response = new ApiResponse(200, "Membership users", Users);

    res.status(200).json(response);
 });

const handleGetAllCurrentMembers = AsyncHandler(async (req, res) => { 
    const { membershipId } = req.params;

    if (!membershipId) {
        throw new ApiError(400, "Please provide membershipId");
    }

    const membership = await Membership.findById(membershipId);

    if (!membership) {
        throw new ApiError(400, "Membership not found");
    }

    const membershipUsersIds = membership.users;

    const Users = [];
    membershipUsersIds.map(async (membershipUserId) => {
        const membershipUser = await MembershipUser.findById(membershipUserId).populate("user", "name email");

        if(membershipUser.endDate > new Date()) {
            Users.push(membershipUser);
        }

    })
    const response = new ApiResponse(200, "Membership users", Users);

    res.status(200).json(response);
});

const handleCheckMember = AsyncHandler(async (req, res) => { 
    const { membershipId, userId } = req.body;

    if (!membershipId || !userId) {
        throw new ApiError(400, "Please provide membershipId and userId");
    }

    const membership = await Membership.findById(membershipId);
    if (!membership) {
        throw new ApiError(400, "Membership not found");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    if(user.membershipType === membership.membershipType){
        res.status(200).json({ message: "User is already a member" });
    }else{
        res.status(200).json({ message: "User is not a member" });
    }
});

const handleAddMember = AsyncHandler(async (req, res) => {
    const { membershipId, userId } = req.body;

    if (!membershipId || !userId) {
        throw new ApiError(400, "Please provide membershipId and userId");
    }

    const membership = await Membership.findById(membershipId);
    if (!membership) {
        throw new ApiError(400, "Membership not found");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    if(user.membershipType === membershipType){
        throw new ApiError(400, "User is already a member");
    }

    const membershipUser = await MembershipUser.create({});//TODO: add start date and end date

    membership.users.push(membershipUser._id);

    await membership.save();
    user.membershipType = membership.membershipType;
    user.membershipExpiryDate = membershipUser.endDate;
    await user.save();

    const response = new ApiResponse(200, "Membership added successfully", {
        membership,
        membershipUser,
        user:{
            name: user.name,
            email: user.email,
            membershipType: user.membershipType,
            membershipExpiryDate: user.membershipExpiryDate,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    });

    res.status(200).json(response);
 });

 const handleRemoveMember = AsyncHandler(async (req, res) => {
    const {userId , membershipId} = req.body;

    if (!userId || !membershipId) {
        throw new ApiError(400, "Please provide userId and membershipId");
    }

    const membership = await Membership.findById(membershipId);
    if (!membership) {
        throw new ApiError(400, "Membership not found");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    if(user.membershipType !== membership.membershipType){
        throw new ApiError(400, "User is not a member");
    }

    user.membershipType = null;
    user.membershipExpiryDate = null;

    const updatedUser = await user.save();

    // const membershipUserIds = membership.users;

    // const membershipUser = membershipUserIds.map((membershipUserId) => {
    //     const membershipUser = MembershipUser.findById(membershipUserId);

    //     if((membershipUser.user.toString() === userId.toString()) && (membershipUser.endDate > new Date())){
    //         return membershipUser;
    //     }else{
    //         return null;
    //     }
    // })

    const response = new ApiResponse(200, "Membership removed successfully", user = {
        name: updatedUser.name,
        email: updatedUser.email,
        membershipType: updatedUser.membershipType,
        membershipExpiryDate: updatedUser.membershipExpiryDate,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
    });

    res.status(200).json(response);

 })

 export {
    handleGetMembership,
    handleGetAllMemberships,
    handleUpdateMembership,
    handleDeleteMembership,
    handleAddMembership,
    handleCheckMember,
    handleAddMember,
    handleRemoveMember,
    handleGetAllMembers,
    handleGetAllCurrentMembers
 }
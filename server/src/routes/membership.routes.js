import {Router} from "express";
import { authenticateAdmin,authenticateUser } from "../middleware/auth.middleware.js";

import {
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
} from "../controllers/membership.controller.js";

const router = Router();

//user routes
router.get("/getMembership/:membershipType",authenticateUser,handleGetMembership);
router.get("/getAllMemberships",authenticateUser,handleGetAllMemberships);
router.post("/checkMember/:userId",authenticateUser,handleCheckMember);
router.post("/addMember/:membershipType",authenticateUser,handleAddMember);
router.post("/removeMember/:userId",authenticateUser,handleRemoveMember);



//admin routes
router.get("/getAllMembers",authenticateAdmin,handleGetAllMembers);
router.get("/getAllCurrentMembers",authenticateAdmin,handleGetAllCurrentMembers);
router.post("/addMembership",authenticateAdmin,handleAddMembership);
router.put("/updateMembership/:membershipType",authenticateAdmin,handleUpdateMembership);
router.delete("/deleteMembership/:membershipType",authenticateAdmin,handleDeleteMembership);

export default router;
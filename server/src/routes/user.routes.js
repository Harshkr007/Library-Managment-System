import express from 'express';
import { authenticateUser,authenticateAdmin } from '../middleware/auth.middleware.js';
import {
    handleUserRegister,
    handleUserLogin,
    handleAdminLogin,
    handleUserUpdate,
    handleUserLogout,
    handleUpdateMembership,
    handleGetAllUsers,
    handleGetUser
} from '../controllers/user.controller.js';


const router = express.Router();

router.post("/register",handleUserRegister);
router.post("/login",handleUserLogin);
router.put("/update",authenticateUser,handleUserUpdate);
router.post("/logout",authenticateUser,handleUserLogout);
router.put("/updateMembership",authenticateUser,handleUpdateMembership);


//admin routes
router.post("/admin/login",handleAdminLogin);
router.get("/getAllUser",authenticateAdmin,handleGetAllUsers);
router.get("/getUser", authenticateAdmin, handleGetUser);

export default router;
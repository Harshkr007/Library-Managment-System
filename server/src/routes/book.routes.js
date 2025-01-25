import { Router } from "express";
import { authenticateAdmin,authenticateUser } from "../middleware/auth.middleware.js";

import { handleAddBook,
    handleGetAllBooks,
    handleUpdateBook,
    handleDeleteBook,
    handleGetBookInfo,
    handleIssueBook,
    handleReturnBook,
    handleGetTotalFine,
    handleGetUserBooks
} from "../controllers/book.controller.js";

const router = Router();

//user routes
router.get("/getAllBooks",authenticateUser,handleGetAllBooks);
router.get("/getBookInfo",authenticateUser,handleGetBookInfo);
router.post("/issueBook/:serialNo", authenticateUser, handleIssueBook);
router.post("/returnBook/:bookId",authenticateUser,handleReturnBook);
router.get("/getTotalFine/:userId",authenticateUser,handleGetTotalFine);
router.get("/getUserBooks",authenticateUser,handleGetUserBooks);

//admin routes
router.post("/addBook",authenticateAdmin,handleAddBook);
router.put("/updateBook/:serialNo",authenticateAdmin,handleUpdateBook);
router.delete("/deleteBook/:SerialNo",authenticateAdmin,handleDeleteBook);

export default router;
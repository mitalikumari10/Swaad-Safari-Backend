import express from "express";
import { getAllUsers,register,login, logout,getMyProfile } from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";


// import {special} from "../controllers/authController.js";
// import { updateuser } from "../controllers/authController.js";
// import { deleteuser } from "../controllers/authController.js";

const router = express.Router();

// router.get('/all',getAllUsers);


router.post("/register",register);


router.post("/login",login);


router.get("/logout",logout);


router.get("/me",isAuthenticated,getMyProfile);




export default router;

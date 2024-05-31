import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const isAuthenticated=async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token)
        return res.status(404)
.json({
    success:false,
    message:"Login first!",
});

const decodeddata=jwt.verify(token,process.env.JWT_SECRET);

req.user =await User.findById(decodeddata._id);
next();
};
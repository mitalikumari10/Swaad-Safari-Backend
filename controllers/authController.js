import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import { sendCookie } from "../utils/features.js";
import errhandler from "../middlewares/error.js";
export const getAllUsers = async (req, res) => {

};


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide name, email, and password",
        });
    }

        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) return next(new errhandler("USER ALREADY EXIST",400));

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = await User.create({ name, email, password: hashedPassword });

        sendCookie(user, res, "Registered successfully", 201);
    } catch (error) {
        next(error);
    }
    };



    export const login = async (req, res, next) => {
     try {
        const{email,password}=req.body;

        const user=await User.findOne({email}).select("+password");
 
        if(!user) return next(new errhandler("Invalid Email Or Password",400));
   
 
     const isMatch=await bcrypt.compare(password,user.password);
 
     if(!isMatch)
         return res.status(404)
     .json({
         success:false,
         message:"Invalid Email Or Password",
     });
 
     sendCookie(user,res,`WELCOME BACK,${user.name}`,200);
     
     } catch (error) {
        next(error);
     }};



    export const logout=(req,res)=>
        {
            res.status(200)
            .cookie("token","",{
                expires:new Date(Date.now()),
                sameSite: process.env.NODE_ENV==="Development" ? "lax" : "none",
                secure: process.env.NODE_ENV==="Development" ? false : true,
            })
            .json({
                success:true,
                user:req.user,
            })
        };


    export const getMyProfile = (req, res) => {
        res.status(200).json({
            success:true,
            user:req.user,
        })
    };


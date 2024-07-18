import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import { sendCookie } from "../utils/features.js";
import errorHandler from "../middlewares/error.js";

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide name, email, and password",
            });
        }

        let user = await User.findOne({ email });

        if (user) return next(new errorHandler("USER ALREADY EXISTS", 400));

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password: hashedPassword });

        sendCookie(user, res, "Registered successfully", 201);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) return next(new errorHandler("Invalid Email Or Password", 400));

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "Invalid Email Or Password",
            });
        }

        sendCookie(user, res, `WELCOME BACK, ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
};

export const logout = (req, res) => {
    res.status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        })
        .json({
            success: true,
        });
};

export const getMyProfile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
};

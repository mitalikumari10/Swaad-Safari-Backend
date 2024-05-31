import express from "express";
import cors from "cors";
import restaurantRouter from "./routes/restaurantRoutes.js";
import userRouter from "./routes/authRoutes.js";
import {config } from "dotenv";
import cookieParser from "cookie-parser";
import { errormiddleware } from "./middlewares/error.js";
export const app = express();

config({
  path:"./data/config.env"
})
//using middlewares
app.use(express.json());
app.use(cookieParser());

//using routes
app.use('/api/v1', restaurantRouter);
app.use("/api/v1/users", userRouter);

// Use CORS middleware
app.use(cors({
  origin:"http://localhost:3000/",
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,

}));

app.get('/', (req, res) => {
  res.send('<h1>This is the backend</h1>');
  app.use(errormiddleware);
});



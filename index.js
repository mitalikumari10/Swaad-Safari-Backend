import express from "express";
import cors from "cors";
import {restaurantRouter} from "./routes/restaurantRoutes.js";
import userRouter from "./routes/authRoutes.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import errorMiddleware from "./middlewares/error.js";
import contactRouter from './routes/contactRoutes.js';
import Razorpay from "razorpay"; // Import Razorpay
import { isAuthenticated } from "./middlewares/authMiddleware.js";

config({
  path: "./data/config.env"
});

export const app = express();

// Use CORS middleware
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// Using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Using routes
app.use('/api/v1', restaurantRouter);
app.use("/api/v1/users", userRouter);
app.use('/api/v1/contact', contactRouter);


app.post('/api/v1/payment/order', isAuthenticated, async (req, res) => {
  const { amount, currency } = req.body;

  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency,
    receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
});

app.get('/', (req, res) => {
  res.send('<h1>This is the backend</h1>');
});




// Error handling middleware should be added last
app.use(errorMiddleware);


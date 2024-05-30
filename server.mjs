import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import restaurantRouter from "./routes/restaurantRoutes.js";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
  res.send('<h1>This is the backend</h1>');
});

app.use('/api/v1', restaurantRouter);

mongoose.connect("mongodb://127.0.0.1:27017/Api1")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));

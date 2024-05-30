import express from "express";
import { getAllRestaurants } from "../controllers/restaurantController.js";

const router = express.Router();

router.get('/all', getAllRestaurants);

export default router;

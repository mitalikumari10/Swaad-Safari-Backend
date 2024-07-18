import express from "express";
import { getAllRestaurants } from "../controllers/restaurantController.js";

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const { city } = req.query;
        const query = city ? { 'info.city': city } : {};
        const restaurants = await getAllRestaurants(query); // Pass query to the controller
        res.json({ doc: restaurants });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching restaurants' });
    }
});

export { router as restaurantRouter };

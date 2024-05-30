import { restaurants } from '../models/Restaurant.js';

export const getAllRestaurants = async (req, res) => {
    try {
        const doc = await restaurants.find();
        res.status(200).json({ success: true, doc });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving documents', error });
    }
};

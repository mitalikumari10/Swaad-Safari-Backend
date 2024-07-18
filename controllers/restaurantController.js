import { restaurants } from '../models/Restaurant.js';

export const getAllRestaurants = async (query = {}) => {
    return await restaurants.find(query);
};


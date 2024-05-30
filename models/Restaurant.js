import mongoose from "mongoose";

const restSchema = new mongoose.Schema({
    info: {
        id: String,
        name: String,
        resimage: String,
        locality: String,
        costForTwo: String,
        cuisines: [String],
        avgRating: Number,
        veg: Boolean,
        menu: [{
            itemName: String,
            price: String,
            image: String
        }]
    }
});

export const restaurants = mongoose.model('restaurants', restSchema);

import mongoose from "mongoose";

const restSchema = new mongoose.Schema({
    info: {
        id: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        resimage: {
            type: String,
            required: true
        },
        locality: {
            type: String,
            required: true
        },
        costForTwo: {
            type: Number,
            required: true
        },
        cuisines: {
            type: [String],
            required: true
        },
        avgRating: {
            type: Number,
            required: true
        },
        veg: {
            type: Boolean,
            required: true
        },
        menu: [{
            itemName: String,
            price: String,
            image: String
        }],
        city: {
            type: String,
            required: true
        }
    }
});

export const restaurants = mongoose.model('restaurants', restSchema);

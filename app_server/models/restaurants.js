const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    autor: String,
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: String,
    createdOn: {
        type: Date,
        'default': Date.now
    }
});


const openingTimeSchema = new mongoose.Schema({
    days: {
        type: String,
        required: true
    },
    opening: String,
    closing: String,
    closed: {
        type: Boolean,
        required: true
    }
});

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    rating: {
        type: Number,
        'default': 0,
        required: true,
        min: 0,
        max: 5
    },
    facilities: [String],
    coords: {
        type: { type: String },
        coordinates: [Number]
    },
    openingTimes: [openingTimeSchema]
});

restaurantSchema.index({ coords: '2dsphere' });
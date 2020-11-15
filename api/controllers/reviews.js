const mongoose = require('mongoose');
const Res = mongoose.model('Restaurant');
const reviewsCreate = (req, res) => {};
const reviewsReadOne = (req, res) => {
    Res
        .findById(req.params.restaurantid)
        .select('name reviews')
        .exec((err, restaurant) => {
            if (!restaurant) {
                return res
                    .status(404)
                    .json({ 'message': 'restaurant not found!' });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            if (restaurant.reviews && restaurant.reviews.length > 0) {
                const review = restaurant.reviews.id(req.params.reviewid);
                if (!review) {
                    return res
                        .status(404)
                        .json({ 'message': 'review not found' });
                } else {
                    response = {
                        restaurant: {
                            name: restaurant.name,
                            id: req.params.restaurantid
                        },
                        review
                    };
                    return res
                        .status(200)
                        .json(response);
                }
            } else {
                return res
                    .status(404)
                    .json({ 'message': 'No reviews Found!' });
            }
        });
};
const reviewsUpdateOne = (req, res) => {};
const reviewsDeleteOne = (req, res) => {};

module.exports = {
    reviewsCreate,
    reviewsDeleteOne,
    reviewsReadOne,
    reviewsUpdateOne
};
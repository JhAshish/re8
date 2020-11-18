const mongoose = require('mongoose');
const Res = mongoose.model('Restaurant');

const doSetAverageRating = (restaurant) => {
    if (restaurant.reviews && restaurant.reviews.length > 0) {
        const count = restaurant.reviews.length;
        const total = restaurant.reviews.reduce((acc, { rating }) => {
            return acc + rating;
        }, 0);
        restaurant.rating = parseInt(total / count, 10);
        restaurant.save(err => {
            if (err) {
                console.log(err);
            } else {
                console.log(`Average rating updated to ${restaurant.rating}`);
            }
        });
    }
};

const updateAverageRating = (restaurantid) => {
    Res.findById(restaurantid)
        .select('rating reviews')
        .exec((err, restaurant) => {
            if (!err) {
                doSetAverageRating(restaurant);
            }
        });
};

const doAddReview = (req, res, restaurant) => {
    if (!restaurant) {
        res
            .status(404)
            .json({ 'message': 'restaurant not found' });
    } else {
        restaurant.reviews.push({
            author: req.body.author,
            rating: req.body.rating,
            reviewText: req.body.reviewText
        });
        restaurant.save((err, restaurant) => {
            if (err) {
                res
                    .status(400)
                    .json(err);
            } else {
                updateAverageRating(restaurant._id);
                const thisReview = restaurant.reviews.slice(-1).pop();
                res
                    .status(200)
                    .json(thisReview);
            }
        });
    }
};
const reviewsCreate = (req, res) => {
    const restaurantId = req.params.restaurantid;
    if (restaurantId) {
        Res
            .findById(restaurantId)
            .select('reviews')
            .exec((err, restaurant) => {
                if (err) {
                    res
                        .status(400)
                        .json({ 'message': `${err} this is error!` });
                } else {
                    doAddReview(req, res, restaurant);
                }
            });
    } else {
        res
            .status(404)
            .json({ 'message': `location not found` });
    }
};
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
const reviewsUpdateOne = (req, res) => {
    if (!req.params.reviewid || !req.params.restaurantid) {
        return res
            .status(400)
            .json({ 'message': 'restaurantid and reviewid is required!' });
    }
    Res
        .findById(req.params.restaurantid)
        .select('reviews')
        .exec((err, restaurant) => {
            if (!restaurant) {
                return res
                    .status(400)
                    .json({ 'message': 'restaurant not found' })
            } else if (err) {
                return res
                    .status(404)
                    .json({ 'message': `${err} this is error!` });
            }
            if (restaurant.reviews && restaurant.reviews.length > 0) {
                const thisReview = restaurant.reviews.id(req.params.reviewid);
                if (!thisReview) {
                    return res
                        .status(400)
                        .json({ 'message': 'review not found!' });
                } else {
                    thisReview.author = req.body.author;
                    thisReview.rating = req.body.rating;
                    thisReview.reviewText = req.body.reviewText;
                    restaurant.save((err, restaurant) => {
                        if (err) {
                            return res
                                .status(404)
                                .json({ 'message': `${err} this is error!` });
                        } else {
                            updateAverageRating(restaurant._id);
                            res
                                .status(200)
                                .json(thisReview);
                        }
                    });
                }
            } else {
                res
                    .status(400)
                    .json({ 'message': 'No review to update!' });
            }
        });
};
const reviewsDeleteOne = (req, res) => {
    const { restaurantid, reviewid } = req.params;
    if (!restaurantid || !reviewid) {
        return res
            .status(400)
            .json({ 'message': 'restaurantid and reviewid is required!' });
    }
    Res
        .findById(restaurantid)
        .select('reviews')
        .exec((err, restaurant) => {
            if (!restaurant) {
                return res
                    .status(400)
                    .json({ 'message': 'restaurant not found!' });
            } else if (err) {
                return res
                    .status(404)
                    .json({ 'message': `${err} this is error!` });
            }
            if (restaurant.reviews && restaurant.reviews.length > 0) {
                if (!restaurant.reviews.id(reviewid)) {
                    return res
                        .status(400)
                        .json({ 'message': 'review not found!' });
                } else {
                    restaurant.reviews.id(reviewid).remove();
                    restaurant.save(err => {
                        if (err) {
                            return res
                                .status(404)
                                .json({ 'message': `${err} this is error!` });
                        } else {
                            updateAverageRating(restaurant._id);
                            res
                                .status(204)
                                .json(null);
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({ 'message': 'review not present!' });
            }
        });
};

module.exports = {
    reviewsCreate,
    reviewsDeleteOne,
    reviewsReadOne,
    reviewsUpdateOne
};
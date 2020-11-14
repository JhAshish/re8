const express = require('express');
const router = express.Router();
const ctrlRestaurants = require('../controllers/restaurants.js');
const ctrlReviews = require('../controllers/reviews.js');

//Router for restaurats
router
    .route('/restaurants')
    .get(ctrlRestaurants.restaurantListByDistance)
    .post(ctrlRestaurants.restaurantsCreate);

router
    .route('/restaurants/:restaurantid')
    .get(ctrlRestaurants.restaurantsReadOne)
    .put(ctrlRestaurants.restaurantsUpdateOne)
    .delete(ctrlRestaurants.restaurantsDeleteOne);

//Router for reviews
router
    .route('/restaurants/:restaurantid/reviews')
    .post(ctrlReviews.reviewsCreate);

router
    .route('/restaurants/:restaurantid/reviews/:reviewid')
    .get(ctrlReviews.reviewsReadOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);

module.exports = router;
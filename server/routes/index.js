const express = require('express');
const router = express.Router();
const ctrlRestaurant = require('../controllers/restaurants');
const ctrlOthers = require('../controllers/others');


/* Restaurant pages */
router.get('/', ctrlRestaurant.homelist);
router.get('/restaurant', ctrlRestaurant.restaurantInfo);
router.get('/restaurant/review/new', ctrlRestaurant.addReview);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
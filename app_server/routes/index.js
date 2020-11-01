var express = require('express');
var router = express.Router();
var ctrlRestaurant = require('../controllers/restaurants');
var ctrlOthers = require('../controllers/others');


/* Restaurant pages */
router.get('/', ctrlRestaurant.homelist);
router.get('/restaurant', ctrlRestaurant.restaurantInfo);
router.get('/restaurant/review/new', ctrlRestaurant.addReview);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
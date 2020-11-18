const express = require('express');
const router = express.Router();
const ctrlRestaurant = require('../controllers/restaurants');
const ctrlOthers = require('../controllers/others');


/* Restaurant pages */
router.get('/', ctrlRestaurant.homelist);
router.get('/restaurant/:restaurantid', ctrlRestaurant.restaurantInfo);
router
    .route('/restaurant/:restaurantid/review/new')
    .get(ctrlRestaurant.addReview)
    .post(ctrlRestaurant.doAddReview);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
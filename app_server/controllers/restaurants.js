/* Controllers for restaurants */
/* Home page */
var homelist = (req, res) => {
    res.render('restaurants-list', { title: 'Home' });
};

/* Info page */
var restaurantInfo = (req, res) => {
    res.render('restaurant-info', { title: 'Restaurant Info' });
};

/* Add review page */
var addReview = (req, res) => {
    res.render('restaurant-review-form', { title: 'Add Review' });
};

module.exports = {
    homelist,
    restaurantInfo,
    addReview
};
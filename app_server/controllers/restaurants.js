/* Controllers for restaurants */
/* Home page */
var homelist = (req, res) => {
    res.render('restaurants-list', {
        title: 'RE8 - app to rate places you visit !',
        pageHeader: {
            title: 'RE8',
            strapline: 'Look up the ratings of any place.'
        }
    });
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
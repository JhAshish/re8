/* Controllers for restaurants */
/* Home page */
var homelist = (req, res) => {
    res.render('index', { title: 'Home' });
};

/* Info page */
var restaurantInfo = (req, res) => {
    res.render('index', { title: 'Restaurant Info' });
};

/* Add review page */
var addReview = (req, res) => {
    res.render('index', { title: 'Add Review' });
};

module.exports = {
    homelist,
    restaurantInfo,
    addReview
};
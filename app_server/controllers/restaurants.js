/* Controllers for restaurants */
/* Home page */
var homelist = (req, res) => {
    res.render('restaurants-list', {
        title: 'RE8 - Rate places you visit !',
        pageHeader: {
            title: 'RE8',
            strapline: 'Look up the ratings of any place.'
        },
        sidebar: 'Looking for a place to eat peacefully ? RE8 helps you find places to eat and also to rate them according to your experience.',
        restaurants: [{
            name: 'Coffee Cups',
            address: 'Yashodham colony, Malkapur',
            rating: 3,
            facilities: ['Hot coffee', 'Cold coffee', 'snacks'],
            distance: '100m'
        }, {
            name: 'Coffee Mugs',
            address: 'Telephone colony, Malkapur',
            rating: 4,
            facilities: ['Hot coffee', 'Cold coffee', 'snacks'],
            distance: '500m'
        }, {
            name: 'Snacks Center',
            address: 'Hanuman Nagar, Malkapur',
            rating: 2,
            facilities: ['Hot coffee', 'Cold coffee', 'snacks'],
            distance: '400m'
        }]
    });
};

/* Info page */
var restaurantInfo = (req, res) => {
    res.render('restaurant-info', {
        title: 'Coffee Mugs',
        pageHeader: { title: 'Coffee Mugs' },
        sidebar: {
            context: 'is one of the few places to offer best hot coffees.'
        },
        location: {
            name: 'Coffee Mugs',
            address: 'Yashodham colony, Malkapur',
            rating: 3,
            facilities: ['Hot Coffee', 'Cold Coffee', 'Snacks'],
            coords: { lat: 96.120020, lng: -0.969696 },
            openingTimes: [{
                days: 'Monday - Frinday',
                opening: '7:00am',
                closing: '7:00pm',
                closed: false
            }, {
                days: 'Saturday',
                opening: '8:00am',
                closing: '5:00pm',
                closed: false
            }, {
                days: 'Sunday',
                closed: true
            }],
            reviews: [{
                author: 'Ashish Jha',
                rating: 5,
                timestamp: '11 January 2019',
                reviewText: 'Great place to think silently.'
            }, {
                author: 'Ankit',
                rating: 3,
                timestamp: '6 May 2019',
                reviewText: 'Nice Coffee'
            }]
        }
    });
};

/* Add review page */
var addReview = (req, res) => {
    res.render('restaurant-review-form', {
        title: 'Review Coffee Mugs',
        pageHeader: { title: 'Review Coffee Mugs' }
    });
};

module.exports = {
    homelist,
    restaurantInfo,
    addReview
};
/* Controllers for restaurants */
const axios = require('axios');
const { response } = require('express');


const apiOptions = (process.env.NODE_ENV === 'production') ? 'https://re8-restaurants.herokuapp.com' : 'http://localhost:3000';
/* Showing error page */
const showError = (req, res, status) => {
    let title = `${status} this is error code`;
    let notice = 'Looks like this page dosent exist!';
    res.status(status);
    res.render('generic-notice', {
        title,
        notice
    });
}

/* Home page */
const renderHomepage = (req, res, responseBody) => {
    let message = null;
    if (!(responseBody instanceof Array)) {
        message = 'API lookup error!';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = 'no places found nearby';
        }
    }
    res.render('restaurants-list', {
        title: 'RE8 - Rate places you visit !',
        pageHeader: {
            title: 'RE8',
            strapline: 'Look up the ratings of any place.'
        },
        sidebar: 'Looking for a place to eat peacefully ? RE8 helps you find places to eat and also to rate them according to your experience.',
        restaurants: responseBody,
        message
    });
};

const formatDistance = (distance) => {
    let thisDistance = 0;
    let unit = 'm';
    if (distance > 1000) {
        thisDistance = parseFloat(distance / 1000).toFixed(1);
        unit = 'km';
    } else {
        thisDistance = Math.floor(distance);
    }

    return thisDistance + unit;
}

const homelist = (req, res) => {
    const path = '/api/restaurants';
    (async() => {
        try {
            const response = await axios.get(`${apiOptions}${path}`, {
                params: {
                    lng: -0.7992599,
                    lat: 51.378091,
                    maxDistance: 20000
                }
            });
            let data = [];
            data = response.data.map((item) => {
                item.distance = formatDistance(item.distance);
                return item;
            })
            renderHomepage(req, res, data);
        } catch (err) {
            showError(req, res, err.response.status);
        }
    })();

};

const getRestaurantInfo = (req, res, callback) => {
    const path = `/api/restaurants/${req.params.restaurantid}`;
    (async() => {
        try {
            const response = await axios.get(`${apiOptions}${path}`);
            let data = response.data;
            data.coords = {
                lng: response.data.coords[0],
                lat: response.data.coords[1]
            };
            callback(req, res, response.data);
        } catch (err) {
            showError(req, res, err.response.status)
        }
    })();
};

/* Info page */
const renderDetailPage = (req, res, location) => {
    res.render('restaurant-info', {
        title: location.name,
        pageHeader: { title: location.name },
        sidebar: {
            context: 'is one of the few places to offer best hot coffees.'
        },
        location
    });
};



const restaurantInfo = (req, res) => {
    getRestaurantInfo(req, res, (req, res, responseData) => {
        renderDetailPage(req, res, responseData);
    });
};

const doAddReview = (req, res) => {
    const restaurantid = req.params.restaurantid;
    const path = `/api/restaurants/${restaurantid}/reviews`;
    const postData = {
        author: req.body.name,
        rating: req.body.rating,
        reviewText: req.body.review
    };
    (async() => {
        try {
            const response = await axios.post(`${apiOptions}${path}`, postData);
            if (!postdata.author || !postdata.rating || !postdata.reviewText) {
                res.redirect(`/location/${locationid}/review/new?err=val`);
            } else {
                res.redirect(`/restaurant/${restaurantid}`);
            }
        } catch (err) {
            if (err.response.status === 400 && err.response.data._message === 'Restaurant validation failed') {
                res.redirect(`/restaurant/${restaurantid}/review/new?err=val`);
            } else {
                showError(req, res, err.response.status);
            }
        }
    })();
};

const renderReviewForm = (req, res, name) => {
    res.render('restaurant-review-form', {
        title: `Review ${name} on re8`,
        pageHeader: { title: `Review ${name}` },
        error: req.query.err
    });
};

/* Add review page */
const addReview = (req, res) => {
    getRestaurantInfo(req, res, (req, res, responseData) => {
        renderReviewForm(req, res, responseData.name);
    });
};

module.exports = {
    homelist,
    restaurantInfo,
    addReview,
    doAddReview
};
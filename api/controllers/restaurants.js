const mongoose = require('mongoose');
const Res = mongoose.model('Restaurant')

const restaurantListByDistance = async(req, res) => {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const near = {
        type: "Point",
        coordinates: [lng, lat]
    };
    //geoNear no longer supports limit instead used $limit
    const geoOptions = {
        distanceField: "distance.calculated",
        key: 'coords',
        spherical: true,
        maxDistance: 20000,
        $limit: 10

    };
    if (!lng || !lat) {
        return res
            .status(404)
            .json({ 'message': 'lng and lat required!' });
    }
    try {
        const results = await Res.aggregate([{
            $geoNear: {
                near,
                ...geoOptions
            }
        }]);
        const restaurants = results.map(result => {
            return {
                _id: result._id,
                name: result.name,
                address: result.address,
                rating: result.rating,
                facilities: result.facilities,
                distance: `${result.distance.calculated.toFixed()}m`
            }
        });
        return res
            .status(200)
            .json(restaurants);
    } catch (err) {
        return res
            .status(404)
            .json({ 'message': `${err} this is error` });
    }
};
const restaurantsCreate = (req, res) => {
    Res.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(","),
        coords: {
            type: "Point",
            coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
        },
        openingTimes: [{
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1
            },
            {
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2
            }
        ]

    }, (err, restaurant) => {
        if (err) {
            res
                .status(400)
                .json({ 'message': `${err} this is error` });
        } else {
            res
                .status(201)
                .json(restaurant);
        }
    });
};
const restaurantsReadOne = (req, res) => {
    Res
        .findById(req.params.restaurantid)
        .exec((err, restaurant) => {
            if (!restaurant) {
                return res
                    .status(404)
                    .json({ "message": "Restaurant not found!" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            }
            res
                .status(200)
                .json(restaurant);
        });
};
const restaurantsUpdateOne = (req, res) => {
    if (!req.params.restaurantid) {
        return res
            .status(404)
            .json({ 'message': 'restaurantid is required!' });
    }
    Res
        .findById(req.params.restaurantid)
        .select('-reviews -rating')
        .exec((err, restaurant) => {
            if (err) {
                return res
                    .status(400)
                    .json({ 'message': `${err} this is error!` });
            } else if (!restaurant) {
                return res
                    .status(404)
                    .json({ 'message': 'Restaurant not found!' });
            }
            restaurant.name = req.body.name;
            restaurant.address = req.body.address;
            restaurant.facilities = req.body.facilities.split(",");
            restaurant.coords = {
                type: 'Point',
                coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
            };
            restaurant.openingTimes = [{
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1
            }, {
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2
            }];
            restaurant.save((err, restaurant) => {
                if (err) {
                    res
                        .status(404)
                        .json({ 'message': `${err} this is error!` });
                } else {
                    res
                        .status(200)
                        .json(restaurant);
                }
            });
        });
};
const restaurantsDeleteOne = (req, res) => {};
module.exports = {
    restaurantListByDistance,
    restaurantsCreate,
    restaurantsDeleteOne,
    restaurantsReadOne,
    restaurantsUpdateOne
};
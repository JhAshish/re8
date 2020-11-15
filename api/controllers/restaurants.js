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
    res
        .status(200)
        .json({ "status": "success" });
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
const restaurantsUpdateOne = (req, res) => {};
const restaurantsDeleteOne = (req, res) => {};
module.exports = {
    restaurantListByDistance,
    restaurantsCreate,
    restaurantsDeleteOne,
    restaurantsReadOne,
    restaurantsUpdateOne
};
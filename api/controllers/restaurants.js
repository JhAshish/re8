const mongoose = require('mongoose');
const Res = mongoose.model('Restaurant')

const restaurantListByDistance = (req, res) => {};
const restaurantsCreate = (req, res) => {
    res
        .status(200)
        .json({ "status": "success" });
};
const restaurantsReadOne = (req, res) => {
    Res
        .findById(req.params.restaurantid)
        .exec((err, restaurant) => {
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
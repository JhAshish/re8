const mongoose = require('mongoose');
const Res = mongoose.model('Restaurant');
const reviewsCreate = (req, res) => {};
const reviewsReadOne = (req, res) => {};
const reviewsUpdateOne = (req, res) => {};
const reviewsDeleteOne = (req, res) => {};

module.exports = {
    reviewsCreate,
    reviewsDeleteOne,
    reviewsReadOne,
    reviewsUpdateOne
};
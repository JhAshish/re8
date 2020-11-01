var express = require('express');
var router = express.Router();

/* GET home page. */
//separate controller and logic
//application logic or controller
var homepageController = (req, res) => {
  res.render('index', {title: 'Express' });
}
//routing part
router.get('/', homepageController);

module.exports = router;

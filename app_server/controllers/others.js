/* Getting about page */
var about = (req, res) => {
    res.render('index', { title: 'About' });
};

module.exports = {
    about
};
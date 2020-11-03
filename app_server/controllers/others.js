/* Getting about page */
var about = (req, res) => {
    res.render('generic-notice', { title: 'About' });
};

module.exports = {
    about
};
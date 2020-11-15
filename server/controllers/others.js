/* Getting about page */
const about = (req, res) => {
    res.render('generic-notice', {
        title: 'About',
        notice: 'RE8 is designed to serve you the best ratings for the nearby restaurants.<br /><br />We hope you will review few of them too !'
    });
};

module.exports = {
    about
};
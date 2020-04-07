//here we are going to create our isLoggedIn method, in order to protect our endpoints.
const helpers = {}

//establishing our strategy.
helpers.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg', 'Nobody is here, and you shouldn\'t unless you\'re logged in!');
        res.redirect('/api/login');
    }
};

module.exports = helpers;
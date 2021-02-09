const { successPrint, errorPrint } = require('../helpers/debug/debugPrint');
const routeProtectors = {};
routeProtectors.userIsLoggedIn = function (req, res, next) {
    if (req.session.username) {
        successPrint('User logged In');
        next();
    }
    else {
        errorPrint('user not logged In!');
        req.flash('error', 'In order to create a Post, You must be logged In!');
        res.render("login");

    }
}

module.exports = routeProtectors;
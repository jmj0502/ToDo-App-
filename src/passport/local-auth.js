//here we are going to import our passport modules, so we can proceed and establish a local auth strategy.
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

//here we require our user model (since we are going to use it for the whole auth process).
const User = require('../models/users');

//here we are going to setup our auth process for the login route.
passport.use(new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    try {
        const user = await User.findOne({username: username});
        console.log(user);
        if (!user) {
            done(null, false, req.flash('error_msg', 'User not found!'));
            res.locals.message = req.flash();
        }
        const validPassword = await user.validatePassword(password);
        if (!validPassword) {
            done(null, false, req.flash('error_msg', 'Wrong password!'));
            res.locals.message = req.flash();
        }
        return done(null, user);
    } catch (err) {
        console.log(err);
    }
}));

//here we are going to save our users to a session using the .serialize method.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//here we are attachig the user object to the req (as req.user), using the .deserialize method.
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        console.log(err);
    }
});